import { View, Text, StatusBar, Image } from 'react-native';
import React from 'react';
import { useState } from 'react';
import InputFiledComp from '../../components/InputFiledButtonComp';
import RoundButtonComp from '../../components/RoundButtonComp';
import { toastMessage } from '../../config/AppToast';
import auth from '@react-native-firebase/auth';

export default function PhoneLoginScreen() {
    const [phone, setPhone] = useState(null);

    return (
        <InputFiledComp
            placeholder={'手机号'}
            eyboardType={'phone-pad'}
            onChangeText={(text) => setPhone(text)}
        />
    );

}