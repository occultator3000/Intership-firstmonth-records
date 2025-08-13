import { View, Text } from 'react-native';
import React from 'react';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableWithoutFeedback } from 'react-native';


export default function AppToolBar({ navigation, label }) {
    return (
        <View style={{
            padding: 15,
            backgroundColor: '#e3d2c2',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <View style={{ flex: 0.2 }}>
                <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                    <Ionicons name="reorder-three-outline" iconStyle="solid" size={25} />
                </TouchableWithoutFeedback>
            </View>
            <View style={{ flex: 0.8 }}>
                <Text style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>
                    {label}
                </Text>
            </View>
        </View>
    );
}