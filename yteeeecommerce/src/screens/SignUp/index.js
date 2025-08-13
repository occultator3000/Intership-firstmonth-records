import { View, Text, StatusBar, Image, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
import InputFiledComp from '../../components/InputFiledButtonComp';
import RoundButtonComp from '../../components/RoundButtonComp';
import { toastMessage } from '../../config/AppToast';
import auth from '@react-native-firebase/auth';


export default function SignUpScreen({ navigation }) {
    const [mode, setMode] = useState('email'); // 'email' | 'phone' 
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');

    async function GoogleSignUp() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        console.log(email, password);
        if (reg.test(email) === false) {

            toastMessage('error', 'Please enter email');
            return;
        }
        if (!password) {
            toastMessage('error', 'Please enter password');
            return;
        }
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(data => {
                console.log('注册成功:', data);
            }).catch(error => {
                console.log('注册失败:', error);
                //toastMessage('error', error.message);
                Alert.alert('Error', error.message, [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed')
                    },
                ]);
            });
    }

    // 切换模式
    function toggleMode() {
        setMode(mode === 'email' ? 'phone' : 'email');
    }

    const toggleBtnText = mode === 'email' ? '切换到手机验证码注册' : '切换到谷歌邮箱登录';

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#e4dcd1',
                padding: 15
            }}>
            <StatusBar backgroundColor={'#e4dcd1'} />
            <View style={{ flex: 0.5 }}>
                <Image
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    source={require('../../asserts/login.jpg')}
                    resizeMode={'cover'}
                />
            </View>
            <View style={{ flex: 0.5, backgroundColor: '#e4dcd1' }}>
                <Text
                    style={{
                        fontSize: 30,
                        color: 'black',
                        fontWeight: 'bold',
                        marginLeft: 10
                    }}>
                    Sign Up
                </Text>
                <Text>
                    {mode === 'email' ? '谷歌邮箱注册' : '手机号验证码注册/登录'}
                </Text>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                    {mode === 'email' ? (
                        <>
                            <InputFiledComp
                                placeholder={"email"}
                                keyboardType={'email-address'}
                                onChangeText={(text) => setEmail(text)}
                            />
                            <InputFiledComp
                                placeholder={"password"}
                                secureTextEntry={true}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <RoundButtonComp label={'Sign up'} marginTop={30} onPress={() => GoogleSignUp()} />
                        </>) : (
                        <>
                            <InputFiledComp
                                placeholder={"手机号"}
                                keyboardType={'phone-pad'}
                                onChangeText={(text) => setPhone(text)}
                                
                            />
                            <InputFiledComp
                                placeholder={"密码"}
                                keyboardType={'password'}
                                onChangeText={(text) => setPassword(text)}
                                
                            />
                            <InputFiledComp
                                placeholder={"验证码"}
                                keyboardType={'number-pad'}
                                onChangeText={(text) => setCode(text)}
                                
                            />
                            <RoundButtonComp label={'Sign up'} marginTop={30} onPress={() => PhoneSignin()} />
                        </>
                    )}

                </View>
                <View>
                    <TouchableOpacity onPress={() => toggleMode()}>
                        <Text style={{ color: 'blue', textAlign: 'center', }}>
                            {toggleBtnText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}