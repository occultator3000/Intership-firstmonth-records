import { View, Text, ImageBackground, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { React, useRef } from 'react';
import { StatusBar } from 'react-native';
import AppToolBar from '../../components/AppToolBar';
import { _getFromAsyncStorage } from '../../config/asyncStorage';
import { useEffect, useState } from 'react';
import FormInputText from '../../components/FormInputText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectionComp from '../../components/SelectionComp';
import { launchImageLibrary } from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import { CategoryLs } from '../../config/LocalAppData';
import { AMapSdk } from 'react-native-amap3d';
import { Platform, PermissionsAndroid } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '../../config/datePicker';
import LocationPickerModal from '../../modals/LocationPickerModal';
import RoundButtonComp from '../../components/RoundButtonComp';
import { toastMessage } from '../../config/AppToast';
import { axiosClient, CREATE_SHOP } from '../../config/api';
import { AppLoaderSpinner } from '../../config/APPLoader';
import { _storeIntoAsyncStorage } from '../../config/asyncStorage';
import ShowImageModal from '../../modals/ShowImageModal';
// AMapSdk.init(
//   Platform.select({
//     android: "577875f7e5f3050ee26e824a98197a44",
//     ios:"",
//   })
// );

export default function MyShopScreen({ navigation }) {

    const refRBSheet = useRef();

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

    const [shopImage, setshopImage] = useState();
    const [shopOwnerImage, setShopOwnerImage] = useState();
    const [shopCategory, setshopCategory] = useState();
    const [showLocation, setShowLocation] = useState(false);
    const [shoplocation, setShopLocation] = useState();
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [shopOpenTime, setShopOpenTime] = useState();
    const [shopCloseTime, setShopCloseTime] = useState();
    const [currentTimeOption, setCurrentTimeOption] = useState();
    const [showImageModal, setShowImageModal] = useState(false);
    useEffect(() => {
        getUserData();
        //console.log('渲染时的user:', user);
    }, []);

    async function createMyShop() {
        console.log(user);
        //console.log('image', shopImage.assets[0]);
        //return;
        if (!name) {
            toastMessage('error', 'Please enter your shop name');
            return;
        }
        if (!email) {
            toastMessage('error', 'Please enter your email');
            return;
        }
        if (!phone) {
            toastMessage('error', 'Please enter your phone number');
            return;
        }
        if (!shopImage) {
            toastMessage('error', 'Please upload your shop image');
            return;
        }
        if (!shopOwnerImage) {
            toastMessage('error', 'Please upload your shop owner image');
            return;
        }
        if (!shopCategory) {
            toastMessage('error', 'Please select your shop category');
            return;
        }
        if (!shoplocation) {
            toastMessage('error', 'Please select your shop location');
            return;
        }
        if (!shopOpenTime) {
            toastMessage('error', 'Please select your shop open time');
            return;
        }
        if (!shopCloseTime) {
            toastMessage('error', 'Please select your shop close time');
            return;
        }
        const formData = new FormData();
        formData.append('id', user.id);
        formData.append('email', email);
        formData.append('apiToken', user.user.apiToken);
        formData.append('shopname', name);
        formData.append('phone', phone);
        console.log('shoplocation:', shoplocation);
        formData.append('latitude', shoplocation.marker.latitude);

        formData.append('longitude', shoplocation.marker.longitude);
        formData.append('address', shoplocation.address);
        formData.append('shopCategory', shopCategory);
        formData.append('shopOpenTime', shopOpenTime);
        formData.append('shopCloseTime', shopCloseTime);
        console.log('shopImage:', shopImage.assets[0]);
        formData.append('shopImage', {
            uri: shopImage.assets[0].uri,
            type: shopImage.assets[0].type,
            name: shopImage.assets[0].fileName,
        });
        formData.append('shopOwnerImage', {
            uri: shopOwnerImage.assets[0].uri,
            type: shopOwnerImage.assets[0].type,
            name: shopOwnerImage.assets[0].fileName,
        });
        setLoading(true);
        try {
            const { data, status } = await axiosClient.post(CREATE_SHOP, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                //timeout: 10000, // 设置超时时间为10秒

            });
            //console.log('API参数:', formData);
            //console.log(data, '=> Create Shop Data');
            if (status == 200) {
                if (data.status === "200") {
                    toastMessage('success', data.message);

                    //console.log('创建店铺成功:', data);

                    let updateUserData = user;
                    updateUserData.shopData = data.shopData;
                    await _storeIntoAsyncStorage('user', JSON.stringify(updateUserData));
                    // const userDataAfter = await _getFromAsyncStorage('user');
                    // console.log('存储后的user数据:', userDataAfter);
                    // const userJson = JSON.parse(userDataAfter);
                    // console.log('完整user:', userJson);
                    // console.log('shopData:', userJson.shopData);

                } else {
                    toastMessage('error', data.message);
                }
            } else {
                toastMessage('error', 'Error in CREATE_SHOP API');
            }
        } catch (error) {
            console.error('store error:', error);
            toastMessage('error', '网络或服务器异常');
        } finally {
            setLoading(false);
            //return;
        }
    }

    //console.log("AMapSdk:", AMapSdk);
    const amapKey = Platform.select({
        android: "577875f7e5f3050ee26e824a98197a44",
        ios: "",
    });

    //console.log('amapKey:', amapKey); // 打印出来确认
    AMapSdk.init(amapKey);
    //console.log('AMap:', AMap);

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

    async function getUserData() {
        const userData = await _getFromAsyncStorage('user');

        if (userData) {

            let userJson = JSON.parse(userData);
            //console.log('userJson:', userJson);
            setUser(userJson);
        }

    }
    //console.log("user", user);

    async function pickImageFromGallery() {
        try {
            const results = await launchImageLibrary()
            //console.log('result:', results);
            if (results.didCancel) {
                console.log('User cancelled image picker');
                return;
            }
            setshopImage(results);
            //console.log('shopImage:', shopImage);
        } catch (error) {
            console.error("Error picking image:", error);
        }

    }

    async function pickShopOwnerImageFromGallery() {
        try {
            const results = await launchImageLibrary()
            //console.log('result:', results);
            if (results.didCancel) {
                console.log('User cancelled image picker');
                return;
            }
            setShopOwnerImage(results);
            //console.log('shopImage:', shopImage);
        } catch (error) {
            console.error("Error picking image:", error);
        }
    }

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
                        backgroundColor: 'black', // 更明显的灰色
                        width: 60,
                        height: 6,
                        borderRadius: 3,
                        alignSelf: 'center', // 居中
                        marginTop: 10,        // 顶部间距
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

    

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#e3d2c2" barStyle="light-content" />
            <AppLoaderSpinner animating={loading} />
            <AppToolBar navigation={navigation} label={"MyShop"} />
            <SelectGategoryBs />
            {showLocation && (
                <LocationPickerModal
                    visible={true}
                    onclose={() => setShowLocation(false)}
                    onLocationSeleted={(data) => {
                        setShopLocation(data);
                        setShowLocation(false);
                    }} />
            )}
            <DatePicker
                modal
                mode='time'
                open={openDatePicker}
                date={new Date()}
                onConfirm={(date) => {
                    setOpenDatePicker(false)
                    if (currentTimeOption === 'open') {
                        setShopOpenTime(formatDate(date.getHours() + ':' + date.getMinutes()));
                    } else if (currentTimeOption === 'close') {
                        setShopCloseTime(formatDate(date.getHours() + ':' + date.getMinutes()));
                    }
                }}
                onCancel={() => {
                    setOpenDatePicker(false)
                }} />
            <ShowImageModal
                visible={showImageModal}
                imageUri={user?.shopData?.shopImage?.uri}
                onClose={()=> setShowImageModal(false)}
            />

            {user !== undefined && user.shopData == null ? (
                <>
                    <View style={{ flex: 1, padding: 15 }}>

                        <FormInputText placeholder={'Name'} onChangeText={(text) => setName(text)} />
                        <FormInputText placeholder={'Email'} extraStyle={{ marginTop: 10 }} onChangeText={(text) => setEmail(text)} />
                        <FormInputText placeholder={'Phone'} extraStyle={{ marginTop: 10 }} onChangeText={(text) => setPhone(text)} keyboardType='number-pad' />
                        <SelectionComp
                            label={'Upload Shop Image'}
                            image={<Ionicons name='image-sharp' size={20} />}
                            extraStyle={{ marginTop: 20 }}
                            onPress={() => pickImageFromGallery()}
                            checked={shopImage ? true : false}
                        />
                        <SelectionComp
                            label={'Upload Shop Owner Image'}
                            image={<Ionicons name='image-sharp' size={20} />}
                            extraStyle={{ marginTop: 10 }}
                            onPress={() => pickShopOwnerImageFromGallery()}
                            checked={shopOwnerImage ? true : false}
                        />
                        <SelectionComp
                            label={shopCategory === undefined ? 'Select Category' : 'Selected Category - ' + shopCategory}
                            image={<Ionicons name='chevron-down' size={21} />}
                            extraStyle={{ marginTop: 10 }}
                            onPress={() => refRBSheet.current.open()}
                            checked={shopCategory ? true : false}
                        />
                        <SelectionComp
                            label={shoplocation ? 'shoplocation: ' + shoplocation.address : 'Select Shop Location'}
                            image={<Ionicons name='location-sharp' iconStyle='solid' size={21} />}
                            extraStyle={{ marginTop: 10 }}
                            onPress={() => {
                                requestLocationPermission();
                                setShowLocation(true)
                            }}
                            checked={shoplocation ? true : false}
                        />
                        <SelectionComp
                            label={shopOpenTime === undefined ? 'Open Time' : 'Open Time - ' + shopOpenTime}
                            image={<Ionicons name='time' size={18} />}
                            extraStyle={{ marginTop: 10 }}
                            onPress={() => {
                                setCurrentTimeOption('open');
                                setOpenDatePicker(true);

                            }}
                            checked={shopOpenTime ? true : false}
                        />
                        <SelectionComp
                            label={shopCloseTime === undefined ? 'Close Time' : 'Close Time - ' + shopCloseTime}
                            image={<Ionicons name='time' size={18} />}
                            extraStyle={{ marginTop: 10 }}
                            onPress={() => {
                                setCurrentTimeOption('close');
                                setOpenDatePicker(true);

                            }}
                            checked={shopCloseTime ? true : false}
                        />
                        <RoundButtonComp label='Submit it ' sstyle={{ marginTop: 10, }} onPress={() => createMyShop()} />
                    </View>
                </>
            ) : (
                <>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.3 }}>
                            <ScrollView style={{ flex: 1 }}>
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
                                    {/* 查看图标，绝对定位在右上角 */}
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
                            </ScrollView>
                        </View>
                        <View style={{ flex: 0.7 }}>
                            <View style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                backgroundColor: '#ffd4b9',
                                position: 'absolute',
                                top: -50,
                                left: (Dimensions.get('window').width / 2) - 50,
                            }}>
                                <Image
                                    style={{ width: 100, height: 100, borderRadius: 50, }}
                                    source={{
                                        uri: user?.shopData?.shopOwnerImage.uri,
                                    }} />
                            </View>
                            <View
                                style={{
                                    marginTop: 50,
                                    alignItems: 'center',
                                }}>
                                <Text style={{
                                    fontSize: 20,
                                    color: 'black',
                                    fontWeight: 'bold'
                                }}>
                                    {user?.shopData?.shopname}
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 10,
                                backgroundColor: '#f2f5f5',
                                elevation: 8,
                                padding: 10,
                                marginHorizontal: 10
                            }}>
                                <View style={{ flex: 0.5, alignItems: 'center' }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Total Orders</Text>
                                    <Text style={{ fontWeight: '500', color: 'black', marginTop: 3 }}>100 </Text>
                                </View>
                                <View style={{ flex: 0.5, alignItems: 'center' }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Reviews</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: '500', color: 'black', marginTop: 3, marginRight: 4 }}>4.5</Text>
                                        <Ionicons name='star' size={18} color={'#f5c518'} />
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}

