### 一、初始化项目

#### 导入图片资源，初始化typescript

安装typescript

- 安装命令：使用npm install --save-dev typescript进行安装
- 版本检查：若工程已初始化包含TypeScript，则无需重复安装

`tsc --init`

可以将target 改成 es2016

同时jsx写为react

安装类型声明 ﻿

- 核心声明：必须安装@types/react和@types/react-native
- 安装方式：可通过npm i --save-dev @types/react @types/react-native一次性安装
- 动态扩展：随着使用第三方库的增加，需要持续补充新的类型声明

#### 数据存储 ﻿

##### 1）集成AsyncStorage ﻿

- 库安装：使用npm install @react-native-async-storage/async-storage安装
- 核心功能：提供本地数据持久化存储能力
- 方法封装：需要对基础方法进行二次封装以增强健壮性

### 二、路由管理

#### 1. 依赖安装

##### 1）@react-navigation/bottom-tabs

- 功能：用于构建应用底部的tab页导航
- 安装命令：npm i @react-navigation/bottom-tabs

###### 2）@react-navigation/stack 

- 功能：提供页面堆栈式导航功能
- 安装命令：npm i @react-navigation/stack

###### 3）react-native-gesture-handler ﻿

- 依赖关系：react-navigation的必需依赖库
- 安装命令：npm i react-native-gesture-handler

###### 4）react-native-safe-area-context

- 功能：处理设备安全区域显示问题
- 安装命令：npm i react-native-safe-area-context

###### 5）react-native-screens 

- 搭配使用：与@react-navigation/stack配合使用
- 安装命令：npm i react-native-screens

#### 2. 路由管理的介绍 

###### 1）navigate方法 ﻿

- 工作原理：在当前导航栈中查找目标页面，**存在则复用，不存在则创建**
- 特点：
  - 会检查导航栈中是否已有相同页面
  - 如果找到已有页面，会直接回到该页面并弹出中间页面
  - 适合需要复用页面的场景
- 示例：从A→B→C→A时，会直接回到最初的A页面
- Push 则会创建新页面

###### 2）replace方法 ﻿

- 功能：用新页面替换当前页面
- 特点：
  - 当前页面会被销毁
  - 返回时会跳过被替换的页面
- 典型应用：登录成功后跳转首页，替换掉登录页
- 示例：A→B→C(replace D)→返回直接到B

###### 3）回退方法 ﻿

- pop方法 
  - 功能：弹出导航栈顶的页面
  - 特点：
    - 简单直接的页面回退
    - 每次调用只弹出一个页面
    - 无法处理tab页切换场景
- goBack方法 
  - 功能：根据路由历史回退到前一个节点
  - 特点：
    - 可以处理tab页切换场景
    - 比pop更智能，能识别不同导航模式
    - 适合复杂导航结构的应用
  - 特殊能力：在tab页间切换时，可以返回到前一个tab页

#### 3. 路由管理配置

##### 配置导航栈属性

1.配置headShown属性为false，隐藏默认标题栏。

2.配置screenOptions中的cardStyle属性，设置elevation为1，避免渲染异常。

##### 使用导航栈

~~~typescript
<NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            cardStyle:{elevation:1},
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomePage} 
            options={{ 
              title: '首页' ,
              headerShown: false,
              }} />

          <Stack.Screen 
          name="Mine" 
            component={MinePage} 
            options={{ 
              title: '我的' ,
              headerShown: true,
              }}/>
        </Stack.Navigator>

      </NavigationContainer>
~~~

添加跳转按钮

~~~typescript
import {useNavigation}from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();//ts:需要给navigation泛型指定类型参数StackNavigationProp<>，否则使用push 方法会报错

  const onButtonPress=()=>{
    navigation.push('Mine');
  }
    return (
      <View>
        <Text> HomePage </Text>
        <Button
          title="Go to Mine Page"
          onPress={() => {onButtonPress}}
        />
      </View>
    )
}
~~~

注意**`useNavigation` 是一个 React Hook**，而 React 的规则规定 **Hook 只能在函数组件或自定义 Hook 中使用**，**不能在类组件（class component）里用**

##### 配置跳转动画

1.在screen组件中配置transitionProcess属性，指定跳转动画。 2.尝试不同的预设动画效果，如slideFromRight、slideFromBottom等。

~~~typescript
<Stack.Navigator>
	<Stack.Screen 
     name="Mine" 
     component={MinePage} 
     options={{ 
       title: '我的' ,
       headerShown: true,
       ...TransitionPresets.SlideFromRightIOS,
      }}/>
 </Stack.Navigator>
~~~

##### 图片和资源管理

1.导入并显示小红书Logo图片。

2.声明图片类型以解决模块找不到的错误。 

在根目录下创建typings.d.ts文件并声明图片资源

~~~typescript
declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.webp"
declare module "*.json"
~~~

在tsconfig.json中添加

~~~json
{
  "compilerOptions":{
  },
  "include": ["src", "typings.d.ts"]
}
~~~

一开始不小心把typings.d.ts放到项目根目录以外了，导致一致报错，真是有些粗心了。

3.提供多种图片格式支持，包括PNG、JPEG和WebP。

#### 4. 欢迎页面和登录页面

1. 三秒倒计时的欢迎页面。

2. 协议阅读和跳转实现

   使用`Linking.openURL('https://www.baidu.com')`模拟实现点击用户协议和隐私政策跳转到外部H5页面查看。

3. 其他登录方式实现

   1.实现微信登录和一键登录功能，包括布局和样式调整。 2.扩大登录按钮的点击区域，提高用户体验。

   activeOpacity={0.7}使TouchableOpacity的点击效果减轻(值越接近于1，点击效果越轻)

   ## `top`

   - 属于 **定位属性**（需要配合 `position` 使用）。
   - 只有当元素设置了 `position: 'absolute' | 'relative'` 时才生效。
   - `top: 20` 的意思是：
     - `position: 'absolute'` → 距离父容器顶部 20px（脱离普通文档流）。
     - `position: 'relative'` → 在原来位置的基础上往下偏移 20px（仍占原本空间）。

4. 启用LayoutAnimation需要设置index.js

   ~~~javascript
   if (Platform.OS === 'android') {
     if (UIManager.setLayoutAnimationEnabledExperimental) {
       UIManager.setLayoutAnimationEnabledExperimental(true);
     }
   }
   ~~~

   **为什么没起效果呢？？？**

   ~~~bash
   setLayoutAnimationEnabledExperimental is currently a no-op in the New Architecture.
   ~~~

   这个警告来自 React Native 新架构（Fabric + TurboModules），提示：

   > **`setLayoutAnimationEnabledExperimental` 在新架构中不再起作用**。

   ---
   
   改用Animated
   
   ~~~typescript
   import {Animated} from 'react-native'
   
   export default () => {
     const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
     ...	其他代码
   	// 缩放动画
     const scaleAnim = useRef(new Animated.Value(1)).current;
   
     // 弹簧动画配置
     const springConfig = {
       tension: 20, // 张力，值越大动画越有力
       friction: 15, // 摩擦力，值越大动画越不"弹"
       useNativeDriver: true,
     };
   
     // 当登录类型变化时触发弹簧动画
     useEffect(() => {
       if (loginType === 'quick') {
         // 快捷登录模式 - 恢复正常大小
         Animated.spring(scaleAnim, {
           ...springConfig,
           toValue: 1,
         }).start();
       } else {
         // 输入登录模式 - 稍微缩小一点
         Animated.spring(scaleAnim, {
           ...springConfig,
           toValue: 0.95,
         }).start();
       }
     }, [loginType]);
   
     // 获取动画样式
     const getAnimatedStyles = () => {
       return {
         transform: [{ scale: scaleAnim }],
       };
     };
     
     ...其他代码
     
     return (
       <Animated.View style={[styles.quickRoot, getAnimatedStyles()]}>
       	{/*q其他代码*/}
       </Animated.View>
     );
   };
   ~~~

##### 细节交互优化目标

1.显示账号和密码的输入长度限制。 

2.手机号格式化展示，便于阅读。 

3.密码可见与不可见切换。 `secureTextEntry={!eyeOpen}`

4.登录按钮可点击性判断。

- 手机号格式

  ~~~ts
  export function formaPhone(phone:string):string{
      let trim:string = phone.replace(/\D/g, '');//不能用phone.trim(),因为它只去掉前后空格，中间在setPhone输入过程中会不断插入空格导致格式错误
      const result = [
          trim.slice(0,3),
          trim.slice(3,7),
          trim.slice(7,11)
      ].join(' ');
      return result;
  }
  ~~~

  但是删除不对了

  改成`].filter(item=>!!item).join(' ');`

  

- 登录按钮点击事件处理

  1.在登录按钮的点击事件中添加判断逻辑，确保在满足条件时才触发登录操作。 

  2.通过canLogin变量控制登录按钮的点击状态

```tsx
if(!canLogin || !check){ //必须满足能登录且同意协议才能登录
    return;
}
```

### 三、服务端接口与网络请求

#### 1.本地Node.js服务

1.使用本地Node.js服务模拟数据。 

2.初始化xjs和ctrl的静态资源。

Node.js服务的启动方法：`npm install` 和` npm run dev` 

#### 2.封装Axios请求

`npm i axios`

~~~ts
import axios,{AxiosResponse} from 'axios';
import Apis from '../api/Apis';

const instance = axios.create({
  baseURL: 'http://10.0.226.202:7001',
  timeout: 10000,
});

/**
 * 对返回体错误信息分类
 */
instance.interceptors.response.use(
    response => response,
    error =>{
        const {response} =error;
        if(!response){
            const {status} = response;
            if(status >= 500){
                // 服务器错误
                console.error('服务器错误，请稍后再试');
            }else if (status ===400){
                //接口参数异常
            }else if(status === 401){
                //登录信息过期，需要重新登录
            }else {
                //其他错误类型，统一按照接口报错处理
            }
        }else {
            //网络异常
        }
        return Promise.reject(error);
    }
);

export const request = (name: string, params: any):Promise<AxiosResponse<any, any>> => {
  const api = (Apis as any)[name];
  const { url, method } = api;
  if (method === 'get') {
    return get(url, params);
  } else {
    return post(url, params);
  }
};

const get = (url: string, params: any):Promise<AxiosResponse<any, any>> => {
  return instance.get(url, {
    params: params,
  });
};

const post = (url: string, params: any):Promise<AxiosResponse<any, any>> => {
  return instance.post(url, params);
};

//export { get, post };
~~~

#### 3.使用Mobx和缓存实现完整登陆流程

集成MobX库

~~~ts
//ESM单例导出
export default new UserStore();
~~~

安装：`npm i mobx mobx-react`

~~~ts
import {flow} from 'mobx';

class UserStore {
  userInfo: any;
  requestLogin = flow(function* (
    this: UserStore,
    phone: string,
    pwd: string,
    callback: (success: boolean) => void,
  ) {
    try {
      const params = {
        name: phone,
        pwd: pwd,
      };
      const { data } = yield request('login', params);  //不再使用await
      console.log('login response:', data);
      if (data) {
        this.userInfo = data;
        callback?.(true);
      } else {
        this.userInfo = null;
        console.log('登录失败，返回数据为空', data); // 新增日志
        callback?.(false);
      }
    } catch (error) {
      console.log(error);
      this.userInfo = null;
      callback?.(false);
    }
  });
}
~~~

#### 4.登录信息本地缓存

封装storages方法

~~~ts
import AsyncStorage from "@react-native-async-storage/async-storage";   
//封装四种数据存储方法
const save =async(key:string,value:string)=>{
    try{
        return await AsyncStorage.setItem(key,value);
    }catch(e){
        console.error("Error saving data", e);
    }
}
/*其他...*/

export { save, load, remove, clear };
~~~

UserStore.ts

~~~ts
if (data) {
        this.userInfo = data;
        save('userInfo',JSON.stringify(data));//缓存到本地
        callback?.(true);
 } 
~~~

Welcome.tsx

~~~tsx
const getUserInfo = async () =>{
    const cacheUserInfo =await load('userInfo');//获取缓存登录信息
    if(cacheUserInfo && JSON.parse(cacheUserInfo)){
      startHome();
    }else{
      startLogin();
    }
  }
~~~

### 四、构建主页Tab

#### 1.基础底部Tab

React Navigation 的 `BottomTab.Navigator` 必须要有一个能占满屏幕的容器，否则它会按默认布局渲染，Tab Bar 可能出现在页面顶部。

~~~tsx
<View style={styles.root}>
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            title: '首页',
          }}
        />
  </BottomTab.Navigator>
</View>
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});
~~~

选中的图标样式

~~~tsx
<BottomTab.Navigator
   screenOptions={({ route }) => ({
   	 tabBarIcon: ({ focused, color, size }) => {
       let img;
       if (route.name === 'Home') {
       img = focused ? icon_tab_home_selected : icon_tab_home_normal;
       } else {
       /*其他代码*/
       }
       return (
         <Image
            style={{
              width: size,
              height: size,
              tintColor: color,
            }}
            source={img}
            />
        );
      },
      tabBarActiveTintColor: '#ff2442',//选中颜色
      tabBarInactiveTintColor: '#999', //未选中颜色
    })}
  >
  {/*其他代码*/}
</BottomTab.Navigator>
~~~

#### 2.自定义底部TabBar样式

~~~tsx
const RedBookTabBar = ({ state, descriptors, navigation }: any) => {
    const { routes, index } = state; 
    return (
      <View style={styles.tabBarContainer}>
        {routes.map((route: any, i: number) => {
          const { options } = descriptors[route.key];
          const label = options.title; 
          const isFocused = index === i;
          return (
            <TouchableOpacity
              style={styles.tabItem}
              key={label}
              onPress={() => {
                navigation.navigate(route.name)
              }}
            >
              <Text
                style={{
                  fontSize: isFocused ? 16 : 14,
                  color: isFocused ? '#ff2442' : '#999',
                  fontWeight: isFocused ? 'bold' : 'normal',
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
~~~

不一样的样式只需要单独写一下代码

~~~tsx
if (i === 2) {
  return (
    <TouchableOpacity
       style={styles.tabItem}
         key={label}
           onPress={() => {
             //TODO
     			}}
        >
         <Image
            style={styles.icon_tab_publish}
            source={icon_tab_publish}
         />
    </TouchableOpacity>
  );
}
~~~

#### 3.集成相册选择模块

安装第三方库：`npm i react-native-image-picker`

~~~tsx
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
~~~

~~~tsx
const onPublishPress = () => {
  launchImageLibrary(
    {
       mediaType: 'photo',
       quality: 1,
       includeBase64: true,
     },
     (res: ImagePickerResponse) => {
        const { assets } = res;
        console.log('选择的图片', assets);
      },
   );
}
~~~

### 五、首页开发

#### 1.搭建首页框架

- 创建首页组件和HomeStore
- 重新安装mobx版本
- 实现ui到暑假班的基本流程

1. 卸载之前的mobx并安装指定版本

`npm i mobx@5.15.4 mobx-react@6.1.8 --legacy-peer-deps`

插件`npm i @babel/plugin-proposal-decorators --legacy-peer-deps`

2. 配置babel.config

~~~ts
plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
~~~

tsconfig.json

~~~json
"experimentalDecorators": true,  
~~~

3. 创建HomeStore. ts以及添加新的api : homeList

注意参数的key不要写错了，否则拿不到数据

~~~ts
import { request } from "../../utils/request";

const SIZE = 10;
export default class HomeStore {

    page = 1;

    requestHomeList = async() => {
        try{
            const params = {
                page:this.page,
                size:SIZE,
            };
            const {data} = await request('homeList', params);
            console.log(`data=${JSON.stringify(data)}`);
        }catch(error){
            console.log('请求失败', error);
        }
    }
}
~~~

4. 创建HomeStore实例，调用方法在打开页面时请求数据

~~~tsx
import {useLocalStore} from 'mobx-react';
import HomeStore from './HomeStore';

export default () => {

  const store = useLocalStore(()=>new HomeStore());

  useEffect(()=>{
    store.requestHomeList();
  }, []);
  
  return ...
}
~~~

#### 2.文章列表

1. 定义首页封面数据类型 typings.d.ts

~~~ts
type ArticleSimple={
  id:string;
  title:string;
  userName:string;
  avatarUrl:string;
  favoriteCount:number;
  isFavorite:boolean;
  image:string;
}
~~~

2. 使用装饰器使得数据每次获取时重新渲染

~~~ts
import { observable } from 'mobx';
export default class HomeStore {
  //existing code...
  @observable homeList: ArticleSimple[] = [];
  
  requestHomeList = async () => {
  	//existing code...
    this.homeList = data;
  };
}
~~~

3. 用observer包裹Home组件，MobX 中的数据（如 `@observable homeList`）发生变化时，只有被 `observer` 包裹的组件才会自动重新渲染。

~~~tsx
import { observer } from 'mobx-react';
export default observer(()=>{});
~~~

4. 使用FlatList组件，编写renderItem渲染函数

~~~tsx
export default observer(()=>{
	//existing code...
	const renderItem = ({
    item,
    index,
  }: {
    item: ArticleSimple;
    index: number;
  }) => {
    return <View style={styles.item}></View>;
  };

  return (
    <View style={styles.root}>
      <FlatList
        style={styles.flatList}
        data={store.homeList}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
});
~~~

5. 数据分页加载,增加分页数据获取逻辑和刷新逻辑

~~~ts
export default class HomeStore {
  //existing code...

  @observable refreshing: boolean = false;

  //重置分页页码
  @action
  resetPage = () => {
    this.page = 1;
  }
  
  requestHomeList = async () => {
    if(!this.refreshing){
      return;
    }
    try {
      this.refreshing = true;//开始刷新
      const params = {
        page: this.page,
        size: SIZE,
      };
      const { data } = await request('homeList', params);
      
      if (data?.length) {
        if (this.page === 1) {
          this.homeList = data;
        } else {
          this.homeList = [...this.homeList, ...data];
        }
        this.page += 1;//页数+1
      } else {
        if (this.page === 1) {
          this.homeList = [];
        } else {
          //没有更多数据了
        }
      }
    } catch (error) {
      console.log('请求失败', error);
    }finally{
      this.refreshing = false;//结束刷新
    }
  };
}
~~~

`@action`：MobX 的装饰器，表示这是一个会修改可观察状态

编写refreshNewData函数

~~~tsx
const refreshNewData = () => {
    store.resetPage();
    store.requestHomeList();
}
~~~

FlatList增加参数

~~~tsx
<FlatList
  extraData={store.refreshing}
  refreshing={store.refreshing}
  onRefresh={refreshNewData}
/>
~~~

6. 上拉加载更多

编写loadMoreData函数

~~~ts
const loadMoreData = () => {
    store.requestHomeList(); //只需请求新数据即可
  };
~~~

FlatList增加参数

~~~tsx
<FlatList
  onEndReachedThreshold={0.2} //距离底部还有20%时触发
  onEndReached={loadMoreData}
/>
~~~

如果要自定义刷新组件，FlatList增加参数refreshControl

~~~tsx
import { RefreshControl } from 'react-native';

// ...existing code...

return (
  <View style={styles.root}>
    <FlatList
      // ...other props...
      refreshControl={
        <RefreshControl
          refreshing={store.refreshing}
          onRefresh={refreshNewData}
          // 这里可以自定义颜色、标题等
          colors={['#ff0000', '#00ff00', '#0000ff']}
          tintColor="#ff6600"
          title="正在刷新..."
          titleColor="#ff6600"
        />
      }
      // 不需要再写 refreshing/onRefresh
    />
  </View>
);
~~~

7. 增加footer

~~~tsx
const Footer = () => {
    return (
      <Text style={styles.footerTxt}>没有更多数据了</Text>
    )
  }
~~~

FlatList增加参数

~~~tsx
<FlatList
  ListFooterComponent={<Footer/>}
/>
~~~

#### 3.实现瀑布流布局

----

黄色波浪线小tip

1. **不用的参数用 `_` 占位**

- 如果参数必须写但不用，可以这样：

  ~~~ts
  //data 替换为_
  getItemLayout={(_, index) => ({
   length: this._dataSource[index].height || 0,
   offset: this._dataSource[index].rowOffsetTop || 0,
   index,
  })}
  ~~~

2. **检查变量作用域，避免重复声明**

- 如果你在外层已经有 const data = ...，内层就不要再用 data作为参数名。

3. **内联style**

- 用数组形式合并样式（如 `[styles.row, 动态样式]`），这样静态部分不会每次都新建。
- 只把必须动态变化的部分放到内联 style。

4. **箭头函数不要直接返回赋值表达式**

~~~ts
ref={ref => {
  this._itemRefs[index] = ref;
}}
~~~

不要写成

~~~ts
ref={ref => this._itemRefs[index] = ref}
~~~

----

表达式`!rowData.some(item => item.height === undefined)`表示判断所有item都有高度返回true

---

1. **瀑布流（masonry/flow layout）计算每个 item 应该放在哪一列，以及它在该列中的垂直偏移（offsetTop）**，从而实现瀑布流多列不等高的布局。

~~~ts
data.forEach((item, index) => {
  let columnIndex = 0;
  // 1. 找到当前高度最小的那一列
  for (let idx = 1; idx < numColumns; idx++) {
    if ((columnHeights[idx] || 0) < (columnHeights[columnIndex] || 0)) {
      columnIndex = idx;
      break;
    }
  }
  // 2. 计算当前 item 在该列的顶部偏移
  const offsetTop = columnHeights[columnIndex] || 0;
  // 3. 获取当前 item 的高度
  const height = this._itemHeights[index];
  // 4. 更新该列的累计高度
  columnHeights[columnIndex] = offsetTop + (height || 0);
  // 5. 记录 item 的布局信息
  const obj = {
    height,         // item 高度
    columnIndex,    // 放在哪一列
    offsetTop,      // 距离该列顶部的距离
    item,           // item 数据
    index,          // item 在原始数据中的索引
  };
  originItems.push(obj);
});
~~~

导入js文件时记得添加模块`declare module '*.js';`

2. 自定义组件ResizeImage

显示宽度：`width: (SCREEN_WIDTH - 18) >> 1`,

显示高度=（图片高度/图片宽度）*显示宽度,

#### 4. 点赞特效

创建Heart组件，替换原本renderItem函数中的Image组件

~~~tsx
{/* <Image style={styles.heart} source={icon_heart_empty} /> */}
<Heart value={item.isFavorite}/>
~~~

Heart.tsx

~~~tsx
type Props = {
    value:boolean,
}

export default (props:Props) => {
  const {value}=props;

  const [showState, setShowState] = useState<boolean>(false);

  useEffect(() => {
    setShowState(value);
  }, [value]);

  return (
    <TouchableOpacity
      onPress={() => {
        setShowState(!showState);
      }}
    >
      <Image
        style={styles.container}
        source={showState ? icon_heart : icon_heart_empty}
      />
    </TouchableOpacity>
  );
};
~~~

设置回调函数

~~~ts
type Props = {
  value: boolean;
  onValueChanged?: (value: boolean) => void;
};
~~~

~~~tsx
<TouchableOpacity
  onPress={() => {
    const newState = !showState;
    setShowState(newState);
    onValueChanged?.(newState);
  }}
>
  {/*其他*/}
</TouchableOpacity>
~~~

---

`position:'absolute'`可以让同级元素叠加

---

添加点击动画

~~~ts
const scale = useRef<Animated.Value>(new Animated.Value(0)).current; //放大动画
const alpha = useRef<Animated.Value>(new Animated.Value(0)).current;

const onHeartPress = () => {
    const newState = !showState;
    setShowState(newState);
    onValueChanged?.(newState);
    if (newState) {
      alpha.setValue(1);
      const scaleAnim = Animated.timing(scale, {
        toValue: 1.6,
        duration: 300,
        useNativeDriver: false,
      });
      const alphaAnim = Animated.timing(alpha, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
        delay:200,
      });

      Animated.parallel([scaleAnim, alphaAnim]).start();//同步动画执行
    } else {
      scale.setValue(0);
      alpha.setValue(0);
    }
  };
~~~

#### 5. 封装TitleBar组件

样式小tip：color不是 View 的背景色属性

- color 没有效果。
- 应该用 backgroundColor: '#ff2442' 来设置线的颜色。

#### 6.封装CategoryList频道组

定义数据参数 typing.d.ts

~~~ts
type Category = {
  name: string;
  default: boolean;
  isAdd:boolean;
}
~~~

在HomeStore中写获取频道组的方法,load获取app数据，如果没有就使用默认的列表数据。

~~~ts
export default class HomeStore {
  @observable categoryList: Category[] = [];
  getCategoryList = async () => {
    const cacheListStr = await load('categoryList');
    if (cacheListStr) {
      const cacheList = JSON.parse(cacheListStr);
      if (cacheList?.length) {
        this.categoryList = cacheList;
      }else{
        this.categoryList = DEFAULT_CATEGORY_LIST;
      }
    } else {
      this.categoryList = DEFAULT_CATEGORY_LIST;
    }
  };
}
~~~

将组件写在FlowList的ListHeaderComponent中

**注**：ScrollView的横向属性不是在style中定义,而是属性horizontal={true}

所有map 的循环一定要加key:

~~~tsx
<ScrollView
  style={styles.scrollView}
  horizontal={true}
  showsHorizontalScrollIndicator={false}
>
  {categoryList.map((item: Category, index: number) => {
    const isSelected = category?.name === item.name;
    return (
      <TouchableOpacity
        key={`${item.name}`} //添加key
        style={styles.tabItem}
        onPress={() => onCategoryPress(item)}
      >
        <Text
          style={isSelected ? styles.tabItemTxtSelected : styles.tabItemTxt}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  })}
</ScrollView>;

~~~

同时FlowList也要加keyExtractor

React 渲染列表时，需要每个 item 有唯一的 `key`，以便高效地更新和重排。

~~~tsx
<FlowList
  // ...
  keyExtractor={(item:ArticleSimple) => `${item.id}`}
/>
~~~

#### 7.自定义频道编辑弹窗

forwardRef是 React 提供的一个**高阶函数**，用于函数组件能够“接收”父组件传递下来的 ref，从而让父组件可以直接操作子组件的某些方法或 DOM 节点。

---

作用

- 普通函数组件**不能直接用 ref**，只能用在类组件或原生组件上。
- 用 forwardRef 包裹后，父组件就可以通过 ref 调用子组件暴露的方法（比如 show/hide）。

框架：

CategoryModal:

~~~tsx
import ...

export interface CategoryModalRed {
  show: () => void;
  hide: () => void;
}

export default forwardRef((props: Props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  //使用useImperativeHandle对外暴露内部方法
  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true} //让状态栏变成透明
      animationType="fade"
      onRequestClose={hide}
    >
      <View style={styles.root}></View>
    </Modal>
  );
});
~~~



CategoryList:

~~~tsx
import CategoryModal, {CategoryModalRed} from './CategoryModal';
export default ({ categoryList, onCategoryChange }: Props) => {
  const modalRef = useRef<CategoryModalRed>(null);
  return (
    <View>
      <TouchableOpacity 
        style={styles.openButton}
        onPress={()=>{
          modalRef.current?.show();
        }}
      >
        <Image style={styles.openImg} source={icon_arrow} />
      </TouchableOpacity>

      <CategoryModal ref={modalRef} />
    </View>
  )
}
~~~

​	做弹窗时有一些细节：让出标题栏的时候要算上状态栏高度，它有可能是unfined所以设置初始值是0，以及mask是一个站位组件，占满剩余空间。

~~~tsx
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  content: {
    width: '100%',
    height: '80%',
    backgroundColor: 'white',
    marginTop: 48 + (StatusBar.currentHeight || 0), // 顶部标题栏高度+状态栏高度
  },
  mask: {
    width: '100%',
    flex: 1, // 占满剩余空间
    backgroundColor: '#00000060',
  },
});
~~~

#### 8.频道编辑数据修改

分别编写两个数据列表的添加删除逻辑

~~~ts
export default forwardRef((props: Props, ref) => {
  const [myList, setMyList] = useState<Category[]>([]);
  const [otherList, setOtherList] = useState<Category[]>([]);
  
  //使用高阶函数实现我的频道点击事件，useCallback防止回调函数重复创建导致性能下降
  const onMyItemPress = useCallback(
    (item: Category, index: number) => () => {
      if (!edit) {
        return;
      }
      //TODO: 添加动画
      const newMyList = myList.filter(i => i.name !== item.name);
      const copy = { ...item, isAdd: false };//将isAdd更新为false，并将列表更新
      const newOtherList = [...otherList, copy];
      setMyList(newMyList);
      setOtherList(newOtherList);
    },
    [myList, otherList, edit, itemAnims],
  );

  //onOtherItemPress逻辑则相反
  return (
    <>
    		{...}
    		<View style={styles.listContent}>
          {myList.map((item: Category, index: number) => {
            return (
              <TouchableOpacity
                  style={...}
                  onPress={() => {
                    if (edit) {
                      onMyItemPress(item, index)();
                    } else {
                      //TODO:点击跳转到对应的频道页面
                    }
                  }}
                >
                  {...}
                </TouchableOpacity>
            );
          })}
        </View>
		</>
  );
}
~~~

添加动画

~~~tsx
export default forwardRef((props: Props, ref) => {
	const [itemAnims, setItemAnims] = useState<{ [key: string]: Animated.Value }>({});
  
	useEffect(() => {
    const allItems = [...myList, ...otherList];
    setItemAnims(anims => {
      const newAnims = { ...anims };
      allItems.forEach(item => {
        if (!newAnims[item.name]) {
          newAnims[item.name] = new Animated.Value(1);
        }
      });
      return newAnims;
    });
  }, [myList, otherList]);
 
  const onMyItemPress = useCallback(
    (item: Category, index: number) => () => {
      if (!edit) {
        return;
      }

      // 动画：淡出+缩小
      Animated.timing(itemAnims[item.name], {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        const newMyList = myList.filter(i => i.name !== item.name);
        const copy = { ...item, isAdd: false };
        const newOtherList = [...otherList, copy];
        setMyList(newMyList);
        setOtherList(newOtherList);
        // 重置动画值，方便下次从推荐频道加回来时有动画
        setItemAnims(anims => ({
          ...anims,
          [item.name]: new Animated.Value(1),
        }));
      });
    },
    [myList, otherList, edit, itemAnims],
  );
}
~~~

然后用Animated.View包裹TouchableOpacity即可

~~~tsx
<Animated.View
   key={`${item.name}`}
   style={{
   opacity: itemAnims[item.name] || 1,
   transform: [
     {
       scale: itemAnims[item.name] || 1,
     },
    ],
  }}
>
  {...}
</Animated.View>
~~~

保存数据

点击完成编辑按钮时保存数据即可

~~~tsx
onPress={() => {
  setEdit((data: boolean) => {
    if (data) {
      //正在编辑,结束编辑前先缓存数据
      save(
        'categoryList',
         JSON.stringify([...myList, ...otherList]),
      );
     	return false;
     } else {
        return true;
     }
   });
}}
~~~

### 六、文章详情

#### 1.请求文章详情

1. 请求方法：requestArticleDetail以及调用，同登录方法

~~~tsx
import ArticleDetailStore from './ArticleDetailStore';
import { useRoute } from '@react-navigation/native';

type RouteParams = {
    ArticleDetail:{
        id:number;
    }
}

export default () => {
    const store = useLocalStore(() => new ArticleDetailStore());
    const {params} = useRoute<RouteProp<RouteParams,'ArticleDetail'>>();//配合Home页面的路由跳转
    //console.log('ArticleDetail params:', params);

    useEffect(()=> {
        store.requestArticleDetail(params.id);
    }, []);
    return (
        <View style={styles.root}>

        </View>
    );
}
~~~

2. 实现跳转路由

在APP.tsx注册ArticleDetail页面，Home.tsx构造高阶函数跳转

~~~ts
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export default observer(() => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const onArticlePress = useCallback((article: ArticleSimple) => () => {
    navigation.push('ArticleDetail', { id: article.id });//使用push跳转文章详情
  }, []);
  //...
}
~~~

#### 2.轮播图

slidePager组件渲染ArticleDetail页面

~~~tsx
const renderImg = () => {
    const { detail } = store;
    const { images } = detail;
    if (!images?.length) {
      return null;
    }
    const data: any[] = images.map(i => {
      return { img: i };
    });
    return (
      <View style={{paddingBottom:30}}> //配合indicatorContainerStyle，使得点可以露在下面
        <ImageSlider
          data={data}
          autoPlay={false}
          closeIconColor="white"
          caroselImageStyle={{ height }} //需计算图片显示高度，同Home的计算方式
          indicatorContainerStyle={{bottom:-40,}}
          activeIndicatorStyle = {styles.activeDot}
          inActiveIndicatorStyle = {styles.inActiveDot}
        />
      </View>
    );
  };
~~~

#### 3.嵌套评论

从Welcome取UserStore

**tip：** 使用{!!tags && <Text style={styles.tagsTxt}>{tags}</Text>}的表达式时使用双感叹号改为布尔值

安装时间库`npm i dayjs`

### 六、购物页面

#### 1.搜索栏



#### 2.品类列表



#### 3.无缝搜索切换

在App.tsx中注册页面

~~~tsx
<Stack.Screen
  name="SearchGoods"
  component={SearchGoods}
  options={{
    title: '搜索商品',
    headerShown: false,
    presentation:'transparentModal',//实现无缝切换页面
    animation: 'fade',
  }}
/>
~~~

