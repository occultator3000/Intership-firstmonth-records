import auth from '@react-native-firebase/auth';

// 发送验证码
export async function sendVerificationCode(phoneNumber) {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return confirmation; // 这个对象后续用于验证
  } catch (error) {
    console.error('发送验证码失败:', error);
    throw error;
  }
}

// 验证验证码
export async function verifyCode(confirmation, code) {
  try {
    const userCredential = await confirmation.confirm(code);
    return userCredential.user;
  } catch (error) {
    console.error('验证码验证失败:', error);
    throw error;
  }
}