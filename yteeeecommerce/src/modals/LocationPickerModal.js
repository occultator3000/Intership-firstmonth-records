import { View, Text, Modal, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Dimensions } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { MapView, MapType, Marker } from "react-native-amap3d";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../config/Colors';

import { fetchAddressByWebAPI } from '../config/FetchGeocode'



export default function LocationPickerModal({ visible, onclose, onLocationSeleted }) {



    const mapRef = useRef();
    const [marker, setMarker] = useState();
    const [address, setAddress] = useState();
    const [locationPermission, setLocationPermission] = useState('未检查');

    // 添加这个useEffect来检查权限状态
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
    }, [visible]); // 每次模态窗口显示时检查

    useEffect(() => {
        (async () => {
            try {
                const results = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                ]);

                console.log('权限请求结果:', results);

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

    useEffect(() => {
        if (marker && marker.latitude && marker.longitude) {
            (async () => {
                const addr = await fetchAddressByWebAPI(marker.latitude, marker.longitude);
                setAddress(addr);
            })();
        }

    }, [marker]);

    if (!visible) {
        return null
    }

    return (
        <Modal visible={visible} transparent={false}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>

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
                    // 监听地图点击事件
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
                </MapView>
                <View style={{
                    padding: 15,
                    backgroundColor: 'white',
                    marginVertical: 15,
                    marginHorizontal: 15,
                    borderRadius: 10,
                }}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{
                                fontWeight: 'bold',
                                color: 'black',
                                fontSize: 20,
                            }}>
                                Pick Shop Location
                            </Text>

                            <TouchableOpacity onPress={() => {
                                try {
                                    onclose()
                                } catch (error) {
                                    console.error('Error in onclose:', error);
                                }
                            }}>
                                <Ionicons name='close' size={30} color='black' />
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={{ color: '#e21417', marginVertical: 10, paddingRight: 10 }}
                        >
                            {address ? address : '点击地图选择位置'}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        onLocationSeleted({ marker, address });
                    }}
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        width: Dimensions.get('window').width - 200,
                        left: Dimensions.get('window').width / 2 - (Dimensions.get('window').width - 200) / 2,

                    }}>
                    <View style={{
                        backgroundColor: COLOR.blue,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10

                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: 'black',
                            fontSize: 20,
                        }}>Confirm Location</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});