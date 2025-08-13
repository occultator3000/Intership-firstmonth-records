import { View, Text } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';

export default function FormInputText({ placeholder, extraStyle ,onChangeText=() => {},keyboardType='default'}) {
    return (
        <View style={[
            {
                borderBottomColor: '#BEC2C3',
                borderBottomWidth: 1,
            },
            extraStyle,
        ]}>
            <TextInput
                placeholder={placeholder}
                onChangeText={(text)=>onChangeText(text)}
                keyboardType={keyboardType}
                style={{
                    borderWith: 1,
                    borderColor: 'black',
                    padding: 8,
                    margin: 8,
                    borderRadius: 5,
                }}
            />
        </View>
    );
}