import AsyncStorage from '@react-native-async-storage/async-storage';

export const _storeIntoAsyncStorage=async(key,value)=>{
    try{
        await AsyncStorage.setItem(key, value);
        console.log("=>success","storing data in async storage");
    }catch(e){
        console.log("=>error","storing data in async storage")
    }
};

export const _getFromAsyncStorage=async(key)=>{
    try{
        const value=await AsyncStorage.getItem(key);
        //console.log("读取内容", value);
        if(value){
            return value;
        }else {
            return null;
        }
    }catch(e){
        console.log("=>error","getting data in async storage")
        return null;
    }
};
