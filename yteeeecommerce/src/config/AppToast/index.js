import Toast from 'react-native-toast-message';

export const toastMessage = (type, message) => {
    Toast.show({
        type: type, // 'success', 'error', 'info'
        text1:message,
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
    });

}

export const toastHide=(type,tsxt1)=>{
    Toast.hide();
}
