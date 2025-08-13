import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { _getFromAsyncStorage } from '../../config/asyncStorage';

export default function SplashScreen({navigation}) {

    setTimeout(()=>{
        //navigation.replace('SignIn');
        checkUser();
    },2000);

    async function checkUser() {
        const value =await _getFromAsyncStorage('user');
        //console.log(value);
        if(!value){
            navigation.replace('OnBoardingScreen')
        }else{
            navigation.replace('SideNavigation');
        }
    }
    return (

        <ImageBackground
            source={require('../../asserts/splashBg.png')}
            style={{ flex: 1, padding: 15 }}
            resizeMode={'cover'}>
            <Text
                style={{
                    fontSize: 25,
                    color: 'white',
                    fontWeight: 'bold',
                }}>
                Ecommerce App
            </Text>
        </ImageBackground>

    );
}

