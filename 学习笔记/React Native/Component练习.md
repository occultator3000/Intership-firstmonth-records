## MyShop页面
~~~markdown
AsyncStorage('user') 
   └─(getUserData)→ user → (分支判断)
                              ├─ 无 shopData → 表单
                              │    ├─ FormInputText → name/email/phone
                              │    ├─ ImagePicker  → shopImage/shopOwnerImage
                              │    ├─ BottomSheet  → shopCategory
                              │    ├─ LocationModal→ shoplocation(marker+address)
                              │    └─ DatePicker   → shopOpenTime/ShopCloseTime
                              │
                              └─ 有 shopData  → 详情展示（读取 shopData 字段）
提交：
[createMyShop]
  读取所有表单状态 + user.id/user.user.apiToken
  → 组装 FormData
  → axiosClient.post(CREATE_SHOP)
     └─ 成功：toast + 将 data.shopData 写回 AsyncStorage('user') → 触发详情分支
~~~
## 核心业务逻辑解析

### 1. 商店创建的完整数据流

~~~javascript
async function createMyShop() {
    // 首先进行完整的数据验证
    if (!name) {
        toastMessage('error', 'Please enter your shop name');
        return;
    }
    if (!email) {
        toastMessage('error', 'Please enter your email');
        return;
    }
    // ... 其他字段验证
    
    // FormData构建 - 处理文件上传的关键
    const formData = new FormData();
    formData.append('id', user.id);
    formData.append('email', email);
    formData.append('apiToken', user.user.apiToken);
    formData.append('shopname', name);
    formData.append('phone', phone);
    
    // 地理位置数据的拆分存储
    formData.append('latitude', shoplocation.marker.latitude);
    formData.append('longitude', shoplocation.marker.longitude);
    formData.append('address', shoplocation.address);
    
    // 图片文件的特殊处理
    formData.append('shopImage', {
        uri: shopImage.assets[0].uri,
        type: shopImage.assets[0].type,
        name: shopImage.assets[0].fileName,
    });
}
~~~



### 2. 权限管理和平台差异处理

~~~javascript
async function requestLocationPermission() {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: '定位权限',
                    message: '需要获取您的定位权限以显示地图位置',
                    buttonNeutral: '稍后询问',
                    buttonNegative: '拒绝',
                    buttonPositive: '允许',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('定位权限已授权');
            } else {
                console.log('定位权限被拒绝');
            }
        } catch (err) {
            console.warn(err);
        }
    }
}

// 高德地图初始化的平台配置
const amapKey = Platform.select({
    android: "577875f7e5f3050ee26e824a98197a44",
    ios: "",
});
AMapSdk.init(amapKey);
~~~



Platform.OS用于检测当前运行平台，Platform.select则提供了更优雅的平台差异化配置方式。权限请求使用了`async/await`模式，这是现代JavaScript处理异步操作的标准方式，比传统的回调函数更清晰。

### 3. 图片选择和状态管理的异步处理

~~~javascript
async function pickImageFromGallery() {
    try {
        const results = await launchImageLibrary()
        if (results.didCancel) {
            console.log('User cancelled image picker');
            return;
        }
        setshopImage(results);
    } catch (error) {
        console.error("Error picking image:", error);
    }
}

async function pickShopOwnerImageFromGallery() {
    try {
        const results = await launchImageLibrary()
        if (results.didCancel) {
            console.log('User cancelled image picker');
            return;
        }
        setShopOwnerImage(results);
    } catch (error) {
        console.error("Error picking image:", error);
    }
}
~~~



这两个函数虽然功能相似，但每个函数只负责处理一种图片的选择，通过不同的状态变量(shopImage和shopOwnerImage)来管理。didCancel检查是处理用户取消操作的关键

### 4. 底部抽屉组件的封装设计

~~~javascript
const SelectGategoryBs = () => {
    return (
        <RBSheet ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            draggable={true}
            height={Dimensions.get('window').height * 0.5}
            customStyles={{
                wrapper: {
                    backgroundColor: 'transparent',
                },
                draggableIcon: {
                    backgroundColor: 'black',
                    width: 60,
                    height: 6,
                    borderRadius: 3,
                    alignSelf: 'center',
                    marginTop: 10,
                },
            }}
        >
            <View style={{ padding: 15 }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'black',
                }}>Select Shop Category</Text>
                <View>
                    {CategoryLs.map(item => {
                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    setshopCategory(item.name)
                                    refRBSheet.current.close();
                                }}>
                                <View style={{ marginTop: 10 }}>
                                    <View
                                        style={{
                                            padding: 5,
                                            borderBottomColor: 'gray',
                                            borderBottomWidth: 1,
                                        }}>
                                        <Text style={{ marginBottom: 2 }}>{item.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </RBSheet>
    );
};
~~~



使用了useRef来直接控制底部抽屉的开关，这是React中访问DOM元素或组件实例的标准方式。map函数渲染列表时正确使用了key属性。点击处理函数中，先设置状态再关闭抽屉。

### 5. 条件渲染和用户状态管理

~~~javascript
{user !== undefined && user.shopData == null ? (
    <>
        {/* 商店创建表单 */}
        <View style={{ flex: 1, padding: 15 }}>
            <FormInputText placeholder={'Name'} onChangeText={(text) => setName(text)} />
            {/* 其他表单元素 */}
        </View>
    </>
) : (
    <>
        {/* 商店信息展示 */}
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.3 }}>
                <ImageBackground
                    source={{ uri: user?.shopData?.shopImage.uri }}
                    resizeMode={'cover'}
                    style={{
                        height: Dimensions.get('window').height * 0.3,
                        backgroundColor: '#f5ebc0',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            borderRadius: 20,
                            padding: 6,
                        }}
                        onPress={() => setShowImageModal(true)}
                    >
                        <Ionicons name="eye" size={24} color="#fff" />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </View>
    </>
)}
~~~


通过检查user.shopData的存在性来决定显示创建表单还是信息展示页面。使用了**可选链操作符**(`?.`)来安全访问嵌套对象属性，避免了undefined错误。flex布局的使用(`flex: 0.3`, flex: 0.7)实现了屏幕的比例分割，这是React Native中响应式设计的重要技巧。

### 6. 异步数据持久化和状态同步

~~~javascript
// API调用成功后的数据更新
if (data.status === "200") {
    toastMessage('success', data.message);
    
    let updateUserData = user;
    updateUserData.shopData = data.shopData;
    await _storeIntoAsyncStorage('user', JSON.stringify(updateUserData));
}

// 组件初始化时的数据加载
async function getUserData() {
    const userData = await _getFromAsyncStorage('user');
    if (userData) {
        let userJson = JSON.parse(userData);
        setUser(userJson);
    }
}
~~~



这部分代码是**本地数据持久化的完整流程**。API成功响应后，立即更新本地存储的用户数据，确保应用状态与服务器数据保持同步。JSON.stringify和JSON.parse的使用体现了JavaScript中对象序列化的标准做法。

## OnBoarding页面

### 1.动画驱动的滑动引导架构

#### 核心状态管理和动画系统

~~~javascript
const scrollx = useRef(new Animated.Value(0)).current;
const [currentIndex, setCurrentIndex] = useState(0);
const slideRef = useRef(null);
const { width, height } = Dimensions.get("screen");
~~~



这里建立了整个引导页的状态基础。scrollx是一个持续的动画值，用于跟踪用户的滑动距离，这是React Native中处理复杂动画的核心模式。通过useRef]创建的Animated.Value能够在组件重新渲染时保持其状态，这是性能优化的关键技术。currentIndex状态追踪当前显示的页面索引，配合slideRef引用来实现编程式的页面切换。获取屏幕尺寸并解构赋值，为后续的响应式布局提供基础数据。

#### 可视区域检测和页面状态同步

~~~javascript
const onViewableItemsChanged = info => {
    setCurrentIndex(info.viewableItems[0].index)
};

const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);
~~~



这是FlatList的高级特性应用，onViewableItemsChanged回调函数会在用户滑动时自动触发，获取当前可见项目的信息。这种设计实现了滑动状态与页面索引的实时同步，无论用户是通过手势滑动还是点击按钮切换页面，都能保持状态的一致性。viewabilityConfigCallbackPairs的使用避免了在每次渲染时重新创建回调函数，

### 2.组件化设计和渲染优化

#### 单页内容渲染组件

~~~javascript
const OnBoardingItem = ({ item }) => {
    return (
        <View style={{
            width: width,
            height: height,
            backgroundColor: item.color,
            justifyContent: 'center',
            padding: 20,
        }}>
            <Image
                source={item.image}
                style={{ width: '100%', flex: 0.5, resizeMode: "contain" }}
            />
            <Text style={{ fontSize: 20, fontWeight: '800' }}>{item.heading}</Text>
            <Text>{item.subHeading}</Text>
        </View>
    )
};
~~~

#### 动态指示器的复杂动画实现

~~~javascript
const Indicator = ({ scrollx }) => {
    return (
        <View style={{
            position: 'absolute',
            bottom: 60,
            flexDirection: 'row',
            alignSelf: 'center',
        }}>
            {
                OnBoardingData.map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                    const scale = scrollx.interpolate({
                        inputRange,
                        outputRange: [0.8, 1.4, 0.8],
                        extrapolate: 'clamp',
                    })
                    const opacity = scrollx.interpolate({
                        inputRange,
                        outputRange: [0.6, 0.9, 0.8],
                        extrapolate: 'clamp',
                    })
                    return (
                        <Animated.View
                            key={`indicator-${i}`}
                            style={{
                                height: 10,
                                width: 10,
                                borderRadius: 5,
                                backgroundColor: "#333",
                                margin: 10,
                                transform: [{ scale }],
                                opacity,
                            }}
                        />
                    )
                })
            }
        </View>
    )
}
~~~



每个指示器点都基于全局的scrollx值计算自己的动画状态。inputRange定义了动画的输入范围，`(i-1)*width`到`(i+1)*width`表示当前指示器在相邻三个页面范围内的滚动距离。interpolate函数将滚动距离映射为视觉属性，scale从0.8变化到1.4再回到0.8，创造了当前页面指示器放大的效果。opacity的变化增强了视觉反馈，`extrapolate: 'clamp'`确保动画值不会超出定义的范围。这种基于插值的动画设计让指示器能够流畅地响应用户的滑动操作。

### 3.滑动容器和手势处理

#### FlatList的高级配置和动画集成

~~~javascript
<Animated.FlatList
    ref={slideRef}
    style={{ flex: 1 }}
    data={OnBoardingData}
    keyExtractor={item => item.id}
    renderItem={({ item }) => <OnBoardingItem item={item} />}
    horizontal
    showsHorizontalScrollIndicator={false}
    pagingEnabled={true}
    bounces={false}
    onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollx } } }],
        { useNativeDriver: false },
    )}
    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
/>
~~~

这个Animated.FlatList配置展现了React Native中处理复杂滑动交互。horizontal属性启用水平滑动，pagingEnabled确保滑动会自动对齐到页面边界，bounces={false}禁用了iOS默认的弹性滚动效果，创造更精确的用户体验。onScroll使用了Animated.event，这是一个特殊的函数，能够直接将滚动事件的数值映射到动画值上，绕过JavaScript桥接提升性能。`useNativeDriver: false`是因为我们需要在动画中修改布局属性，而原生驱动只支持变换和透明度动画。

#### 导航逻辑和状态转换

~~~javascript
function scrollTo() {
    if (currentIndex < OnBoardingData.length - 1) {
        slideRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
        navigation.navigate('SignIn');
    }
}
~~~

根据当前页面索引来决定执行滑动到下一页还是完成引导流程。scrollToIndex方法提供了编程式的页面切换能力，与用户手势滑动形成了双向的交互模式。当到达最后一页时，直接导航到登录页面，完成了用户引导到应用主流程的无缝过渡。

#### 动态按钮文案和交互反馈

~~~javascript
<TouchableOpacity style={{
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 8,
}}
    onPress={() => scrollTo()}
>
    <Text style={{
        color: COLOR.blue,
    }}>
        {
            currentIndex == OnBoardingData.length - 1 ? "Finish" : "Next"
        }
    </Text>
</TouchableOpacity>
~~~



根据当前页面状态动态变化，在最后一页显示"Finish"，其他页面显示"Next"。`position: 'absolute'`和`bottom: 10`的定位确保按钮始终在固定位置，不会因为内容变化而位移。

## 地图弹窗

### 1.权限管理和生命周期控制

#### 渐进式权限检查机制

~~~javascript
useEffect(() => {
    async function checkLocationPermission() {
        try {
            const fineLocation = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            const coarseLocation = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
            );
        } catch (err) {
            console.error('权限检查错误:', err);
            setLocationPermission('检查失败');
        }
    }
    checkLocationPermission();
}, [visible]);
~~~



通过PermissionsAndroid.check先检查权限状态，避免了不必要的权限请求弹窗。useEffect的依赖数组中包含visible，意味着每次模态框显示时都会重新检查权限状态，这确保了权限状态的实时性。这种设计特别重要，因为用户可能在应用运行期间通过系统设置修改权限。

### 2.批量权限请求和错误处理

~~~javascript
useEffect(() => {
    (async () => {
        try {
            const results = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            ]);

            if (results[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === 'granted' &&
                results[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] === 'granted') {
                console.log('所有位置权限已获取');
            } else {
                console.warn('部分或全部位置权限被拒绝');
                Alert.alert(
                    '定位权限受限',
                    '请在设备设置中允许应用访问位置信息，以便获取当前位置。',
                    [{ text: '知道了' }]
                );
            }
        } catch (err) {
            console.error('请求权限出错:', err);
        }
    })();
}, []);
~~~

这里使用了requestMultiple来同时请求多个权限，通过立即执行的异步函数模式来处理异步权限请求，避免了在useEffect中直接使用`async`函数的问题。权限被拒绝时，通过友好的Alert对话框指导用户如何手动开启权限

### 3.地图交互和状态同步

#### 核心地图配置和事件处理

~~~javascript
<MapView
    ref={mapRef}
    mapType={MapType.navigation}
    locationEnabled={true}
    initialCameraPosition={{
        target: marker || {
            latitude: 39.91095,
            longitude: 116.37296,
        },
        zoom: 8,
    }}
    style={styles.map}
    onPress={e => {
        try {
            const { latitude, longitude } = e.nativeEvent;
            console.log('地图点击事件:', e.nativeEvent);
            setMarker({ latitude, longitude });
            console.log('Marker set to:', { latitude, longitude });
        } catch (error) {
            console.error('Error setting marker:', error);
        }
    }}>
~~~

mapType={MapType.navigation}提供了适合导航的地图样式，locationEnabled={true}启用了定位功能。initialCameraPosition，优先使用已有的marker位置，如果没有则默认显示北京天安门广场的坐标。

#### 动态标记渲染和自定义样式

~~~javascript
{marker && marker.latitude && marker.longitude ?
    <Marker
        position={marker}
        title='Shop Location'
        draggable={true}
        icon={{
            uri: "https://pic.616pic.com/ys_img/00/08/06/TnCNKnPVDY.png",
            width: 30,
            height: 30,
        }}
    >
    </Marker> : null}
~~~

只有在坐标完整时才渲染标记。draggable={true}允许用户拖拽标记来微调位置，不知道为什么（？）自定义图标没有显示，只有高德地图配置的图标箭头。

### 4.地理编码和地址解析

~~~javascript
useEffect(() => {
    if (marker && marker.latitude && marker.longitude) {
        (async () => {
            const addr = await fetchAddressByWebAPI(marker.latitude, marker.longitude);
            setAddress(addr);
        })();
    }
}, [marker]);
~~~

这个useEffect实现了地理坐标到地址的实时转换，也就是反向地理编码。每当用户选择新的位置时，立即调用Web API获取对应的详细地址。

#### 动态地址显示和用户引导

~~~javascript
<Text style={{ color: '#e21417', marginVertical: 10, paddingRight: 10 }}>
    {address ? address : '点击地图选择位置'}
</Text>
~~~

地址显示使用了条件渲染，在没有选择位置时显示引导文本，选择位置后显示具体地址。

### 5.模态框架构和交互

#### 数据回调和状态传递

~~~javascript
onPress={() => {
    onLocationSeleted({ marker, address });
}}
~~~



通过props传入的`onLocationSeleted`函数，将选择的位置数据（包括坐标和地址）传递给父组件。使用对象形式传递数据比多个参数更清晰，也为未来扩展留下了空间。

#### 模态框的条件渲染优化

~~~javascript
if (!visible) {
    return null
}

return (
    <Modal visible={visible} transparent={false}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* 地图和UI内容 */}
        </View>
    </Modal>
)
~~~

当模态框不可见时直接返回null，避免了不必要的组件渲染和资源消耗。这transparent={false}确保了模态框完全覆盖屏幕
