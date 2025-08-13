import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { _getFromAsyncStorage } from '../../config/asyncStorage';


export default function CustomDrawerContent(props) {

    const [user, setUser] = useState();
    

    useEffect(() => {
        getUserData();
    }, []);

   

    async function getUserData() {
        try {
            const userData = await _getFromAsyncStorage('user');
            console.log(userData, '=>userData');
            if (userData) {
                let userJson = JSON.parse(userData);
                setUser(userJson);
            }
        }catch(error){
            console.error("Error fetching user data:", error);
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: '#e3d2c2' }}>
            <View style={{
                padding: 15,
            }}>
                <View style={{
                    width: 70,
                    height: 70,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: 35,
                }}>
                    <Image
                        style={{ width: 40, height: 40, }}
                        source={require('../../asserts/avatar.png')}
                    />
                </View>
                <Text style={{ marginTop: 5, color: "black", fontSize: 18 }}>{user !== undefined ? user.user.name : ""}</Text>
                <Text style={{ color: 'black' }}>{user !== undefined ? user.user.email : ""}</Text>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    );
}