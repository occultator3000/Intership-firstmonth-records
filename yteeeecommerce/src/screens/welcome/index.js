import { View, Text, StatusBar, PermissionsAndroid, FlatList, Image, TouchableOpacity, Vibration, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AppToolBar from '../../components/AppToolBar';
import RoundButtonComp from '../../components/RoundButtonComp';
import { GET_NEARBY_SHOPS, axiosClient } from '../../config/api';
import { fetchAddressByWebAPI } from '../../config/FetchGeocode';
import { _getFromAsyncStorage, _storeIntoAsyncStorage } from '../../config/asyncStorage';
import { AppLoaderSpinner } from '../../config/APPLoader';
import { toastMessage } from '../../config/AppToast';
import { COLOR } from '../../config/Colors';
const location_current = {
    latitude: 26.05949,
    longitude: 119.329864
}

export default function WelcomeScreen({ navigation }) {

    const [PGranted, setPGranted] = useState();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [shopList, setShopList] = useState([]);
    const [hiddenShopIds, setHiddenShopIds] = useState([]);
    const [longPressedItemId, setLongPressedItemId] = useState(null);

    useEffect(() => {
        checkLocationPermission();
    }, []);

    // useEffect(() => {
    //     if (PGranted) {
    //         const setupData = async () => {
    //             await getUserData();
    //             getCurrentLocation();
    //         };
    //         setupData();
    //     }
    // }, [PGranted]);

    useFocusEffect(
        useCallback(() => {
            if (PGranted) {
                const setupData = async () => {
                    await getUserData();
                    
                };
                setupData();
            }
            return () => {

            };
        }, [PGranted])
    );

    useEffect(() => {
        if (PGranted && user) {
            getCurrentLocation();
        }
    }, [PGranted, user]);


    async function checkLocationPermission() {
        let granted = await getLocationPermission();
        console.log(granted, '=>Permission');
        setPGranted(granted);
    }
    async function getUserData() {
        try {
            const userData = await _getFromAsyncStorage('user');

            if (userData) {

                let userJson = JSON.parse(userData);
                console.log('userJson:', userJson);
                setUser(userJson);
            }
            return null;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }


    }

    async function getLocationPermission() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).catch(err => {
            console.log(err);
        });
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    async function getCurrentLocation() {
        try {
            const location = await fetchAddressByWebAPI(location_current.latitude, location_current.longitude);
            console.log('Current Location:', location);
            await getNearbyShops(location);
        } catch (error) {
            console.error('Error fetching current location:', error);
        }
    }

    async function getNearbyShops(address) {
        //return;
        setLoading(true);
        const queryString = require('query-string');
        const Params = queryString.stringify({
            email: user.user.email,
            apiToken: user.user.apiToken,
            address: address,
        });
        //console.log('GET_NEARBY_SHOPS Params:', Params);
        try {

            const { data, status } = await axiosClient.post(
                GET_NEARBY_SHOPS,
                Params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            console.log(status, '=>Status');
            if (status == 200) {
                if (data.status === "200") {
                    setShopList(data.data);
                    console.log('Get Success:', data);
                    toastMessage('success', data.message);

                } else {
                    toastMessage('error', data.message);
                }
            } else {
                toastMessage('error', 'Error in GET_NEARBY_SHOP API');
            }
        } catch (error) {
            console.error('请求失败', error);
            toastMessage('error', '请求失败，请稍后再试');
        } finally {
            setLoading(false);
        }
    }

    const handleLongPress = (id) => {
        setLongPressedItemId(id);

        Vibration.vibrate(50);

    }
    const handleConfirmHide = (id) => {
        setHiddenShopIds(prev => [...prev, id]);
        setLongPressedItemId(null);
        toastMessage('info', '店铺已隐藏');
    }

    const handleCancelHide = () => {
        setLongPressedItemId(null);
        toastMessage('info', '操作已取消');
    }

    const Shop = ({ item }) => {
        const isLongPressed = item.id === longPressedItemId;

        return (
            <TouchableOpacity style={{
                margin: 5,
                backgroundColor: '#f2f5f5',
                elevation: 8,
                padding: 5,
                width: Dimensions.get('window').width / 2 - 10,
            }}
                activityOpacty={0.8}
                onLongPress={() => handleLongPress(item.id)}
                delayLongPress={1000}
            >

                <View style={{ flexDirection: 'row', flex: 1, }}>
                    <View style={{ flex: 0.3 }}>
                        <Image style={{ width: '100%', height: 200 }} source={{ uri: item.imageUrl }} />
                    </View>
                    <View style={{ flex: 0.7, paddingHorizontal: 10, }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '200', color: 'black' }}>{item.address}</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flex: 0.5
                        }}>
                            <View style={{ marginTop: 5, }}>
                                <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'black' }}> TimeOpen</Text>
                                <Text style={{ fontSize: 14, fontWeight: '200', color: 'black' }}> {item.TimeOpen}</Text>
                            </View>
                            <View style={{ marginTop: 5, }}>
                                <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'black' }}> TimeClose</Text>
                                <Text style={{ fontSize: 14, fontWeight: '200', color: 'black' }}>{item.TimeClose}</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 0.5,
                            marginBottom: 10,
                            backgroundColor: '#f2f5f5',
                            elevation: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            height: 20,
                        }}>
                            <Text style={{ color: COLOR.blue }}>More Details</Text>
                        </View>
                    </View>
                </View>
                {/*长按弹窗覆盖层*/}
                {isLongPressed && (
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(53, 51, 51, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 10,
                            width: '65%',
                            alignItems: 'center',
                            elevation: 5,
                        }}>
                            <TouchableOpacity style={{
                                backgroundColor: COLOR.blue,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 10,
                                width: "100%",
                                alignItems: 'center',
                                borderRadius: 5,
                            }}
                                onPress={() => handleConfirmHide(item.id)}
                            >
                                <Text style={{ color: 'white' }}>不喜欢该商品</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: COLOR.blue,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 10,
                                width: "100%",
                                alignItems: 'center',
                                borderRadius: 5,
                            }}
                                onPress={() => handleCancelHide(item.id)}
                            >
                                <Text style={{ color: 'white' }}>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#e3d2c2" barStyle="light-content" />
            <AppToolBar navigation={navigation} label={"Near by Store"} />
            <AppLoaderSpinner animating={loading} />
            {PGranted !== undefined ? (
                PGranted ? (
                    <View style={{ flex: 1 }}>
                        {shopList.length > 0 ? (
                            console.log('Shop List:', shopList),
                            <FlatList
                                data={shopList.filter(shop => !hiddenShopIds.includes(shop.id))}
                                keyExtractor={list => list.id.toString()}
                                renderItem={({ item }) => <Shop item={item} onLongPress={handleLongPress} />}
                                extraData={[hiddenShopIds, longPressedItemId]}
                                numColumns={2}
                                columnWrapperStyle={{ justifyContent: 'space-between' }}
                            />
                        ) : null}
                    </View>
                ) : (
                    <View style={{
                        flex: 1, justifyContent: 'center', padding: 15,
                    }}>
                        <View style={{ backgroundColor: '#f5f5f5', padding: 5, elevation: 2 }}>
                            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Location Permission Required</Text>
                            <Text style={{ marginTop: 15 }}>Please Allow Location Permission to Continue...</Text>
                            <View style={{ alignItems: 'center', }}>
                                <RoundButtonComp label={'Allow'} width={100} color='#226bd2' onPress={() => checkLocationPermission()} />
                            </View>

                        </View>
                    </View>)
            ) : null}
        </View>
    );
}