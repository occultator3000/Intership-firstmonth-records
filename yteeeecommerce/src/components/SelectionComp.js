import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function SelectionComp({ extraStyle, image, label, onPress, checked }) {
    return (
        <TouchableOpacity style={{ flex: 1 }} onPress={() => onPress()}>
            <View style={[
                {
                    borderColor: '#BEC2C3',
                    borderWidth: 1,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                },
                extraStyle,
            ]}>
                <View style={{flexDirection:'row',maxWidth:'80%'}}>
                    <Text 
                    //numberOfLines={0}
                    style={{
                        color: '#494a4a',
                        //flex:1,
                        //flexWrap: 'wrap',
                    }}>
                        {label}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' ,}}>
                    {checked ?
                        <Ionicons
                            name='checkmark-circle'
                            iconStyle='solid'
                            color={'green'}
                            size={20}
                            style={{ marginRight: 10 }}
                        /> : null}
                    {image}
                </View>
            </View>
        </TouchableOpacity>
    );
}