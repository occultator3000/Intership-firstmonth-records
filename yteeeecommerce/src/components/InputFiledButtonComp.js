import { View, Text, TextInput } from 'react-native';
import React from 'react';

export default function InputFiledComp({
    placeholder,
    keyboardType = 'default',
    secureTextEntry = false,
    onChangeText,
}) {
    return (
        <View
            style={{
                borderBottomColor: 'black',

                borderWidth: 2,
                marginBottom: 20,
                borderRadius: 30,
                paddingHorizontal: 15,
            }}>
            <TextInput
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                onChangeText={(text) => onChangeText(text)}
            />

        </View>
    )
}
