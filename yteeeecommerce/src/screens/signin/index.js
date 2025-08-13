import { View, Text, Image, StatusBar, Alert } from 'react-native';
import React from 'react';
import RoundButtonComp from '../../components/RoundButtonComp';
import FullRoundButtonComp from '../../components/FullRoundButtonComp';
import { _signInWithGoogle } from '../../config/firebase/GoogleSignIn';
import { axiosClient, SIGN_IN } from '../../config/api';
import { AppLoaderSpinner } from '../../config/APPLoader';
import { toastMessage } from '../../config/AppToast';
import { _getFromAsyncStorage, _storeIntoAsyncStorage } from '../../config/asyncStorage';

const adminUser = {
    user: {
        id: 'admin123',
        name: 'admin',
        email: 'admin@admin.com',
        role: 'admin',
        apiToken: 'admin-demo-token-123456', // 模拟的 API Token
    }
};

export default function SigninScreen({ navigation }) {
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        toastMessage('success', 'successfully create toast');
        
    }, []);

    async function AdminLogin(){
        async function checkAndSetAdmin() {
            const user = await _getFromAsyncStorage('user');
            if (!user) {
                await _storeIntoAsyncStorage('user', JSON.stringify(adminUser));
                console.log('已自动写入admin账号');
            } else {
                console.log('已存在用户信息:', user);
            }
        }
        checkAndSetAdmin();
    }

    async function googleSignIn() {
        _signInWithGoogle().then(data => {

            if (!data) {
                console.log('=>Error:', 'No Data');
                return;
            }
            console.log('Google返回的数据:', data);
            _sign_in_api(data);
        })
    }

    async function _sign_in_api(googleData) {
        setLoading(true);
        // try {
        //     const { data, status } = await axiosClient.post(SIGN_IN, {
        //         loginSource: 'google',
        //         sid: '101541091504967578275',
        //         name: 'Brown',
        //         email: 'annb28273@gmail.com',
        //         profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocKIRTawseuT_DzOL6wFg8Fn7y2RcR3rjfffw22SKaRtP_YxwA=s96-c',
        //         fcmToken: '',
        //     })
        //     console.log('Sign In API Response:', data, status);
        // }    catch(error){
        //     console.error('请求失败',error);
        // }

        //console.log('API参数:', googleData);

        const apiParams = {
            loginSource: 'google',
            sid: googleData.data.user.id,
            name: googleData.data.user.givenName,
            email: googleData.data.user.email,
            profileImage: googleData.data.user.photo,
            fcmToken: '',
        };

        try {
            const { data, status } = await axiosClient.post(SIGN_IN, apiParams);
            //console.log('Sign In API Response:', data, status);
            if (status == 200) {
                if (data.status === "200") {
                    console.log('Sign In Success:', data);
                    toastMessage('success', data.message);
                    await _storeIntoAsyncStorage('user', JSON.stringify(data));
                    navigation.navigate('SideNavigation');
                } else {
                    toastMessage('error', data.message);
                }
            } else {
                toastMessage('error', 'Error in Sign IN API');
            }
        } catch (error) {
            console.error('请求失败', error);
            toastMessage('error', '请求失败，请稍后再试');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <AppLoaderSpinner animating={loading} />
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor={'#608f9f'} />
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.5 }}>
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            source={require('../../asserts/signin.jpg')}
                            resizeMode={'cover'}
                        />
                    </View>
                    <View style={{ flex: 0.5, backgroundColor: '#608f9f' }}>
                        <Text
                            style={{
                                fontSize: 30,
                                color: 'black',
                                fontWeight: 'bold',
                                textAlign: 'center',

                            }}>
                            Hello
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                            }}>
                            Welcome to Ecommerce App
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 20,
                                justifyContent: 'space-around',//水平居中
                                alignItems: 'center',//水平居中对齐

                            }}>
                            <RoundButtonComp
                                label={'login'}
                                width={150}
                                onPress={() => {
                                    AdminLogin();
                                    navigation.navigate('SideNavigation')
                                }}
                            />
                            <RoundButtonComp
                                label={'Sign Up'}
                                border='true'
                                width={150}
                                onPress={() => navigation.navigate('SignUpScreen')

                                } />

                        </View>

                        <View
                            style={{

                                marginTop: 50,
                                justifyContent: 'center',//水平居中
                                paddingBottom: 20,
                                flex: 1,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    //marginTop: 20,
                                }}>
                                Or via social media accounts
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10
                                }}>
                                <FullRoundButtonComp
                                    image={require('../../asserts/google-logo.png')}
                                    bg={'white'}
                                    onPress={() => googleSignIn()}
                                //onPress={()=>navigation.navigate('WelcomeScreen')}
                                />
                                <FullRoundButtonComp
                                    image={require('../../asserts/facebook.png')}
                                    bg={'#3a5ba0'}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>

    );
}