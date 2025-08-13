import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const _signInWithGoogle = async () => {
    try {
        GoogleSignin.configure({
            offlineAccess: false,
            webClientId: '610757724325-f9fpu07b5cnb560encsvo1q7q94jkjt9.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log('Google返回数据:', userInfo); // 打印完整结构

        const { idToken } = userInfo.data;
        const googleGredential = auth.GoogleAuthProvider.credential(idToken);
        auth().signInWithCredential(googleGredential);
        // // 登录成功后，把用户信息发给后端
        // const apiParams = {
        //     loginSource: 'google',
        //     sid: userInfo.user.id,
        //     name: userInfo.user.givenName,
        //     email: userInfo.user.email,
        //     profileImage: userInfo.user.photo,
        //     fcmToken: '', // 如果有推送可以填
        // };
        //await axiosClient.post(SIGN_IN, apiParams);
        console.log('Firebase登录后的用户:', userInfo); // 打印完整结构
        return userInfo;
    } catch (error) {
        console.log('Google Sign In Error: ', error)
        return null;
    }
}