import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function RoundButtonComp({
    label,
    border = false,
    onPress,
    width = "100%",
    marginTop = 0,
    color = '#17374e',
}) {

    return (
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => onPress()}>
            <View style={{
                backgroundColor: border ? 'white' : color,
                width: width ? width : "auto",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 20,//圆脚
                //marginLeft: 20,//间距
                borderWidth: border ? 1 : 0,//边框
                //marginHorizontal: 10//水平间距
                // flexDirection: 'row',
                // justifyContent: 'space-around', // 或 'space-between'
                // alignItems: 'center'
            }}>
                <Text style={{
                    color: border ? 'black' : 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',//粗体
                }}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
}