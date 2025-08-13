import { View, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from '../welcome';
import CustomDrawerContent from './CustomDrawerContent';
import MyShopScreen from '../MyShop/MyShopScreen';

const Drawer = createDrawerNavigator();

export default function SideNavigation() {
    return (
        <Drawer.Navigator
            initialRouteName="WelcomeScreen"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerActiveTintColor: 'black',// 选中项的颜色
                drawerInactiveTintColor: 'white',// 未选中项的颜色
                drawerActiveBackgroundColor: 'white',// 选中项的背景颜色
                //矩形框
                drawerStyle: {
                    //backgroundColor: '#e3d2c2', // 侧边栏背景颜色
                    width: 280, // 侧边栏宽度
                },
            }}
        >
            <Drawer.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="MyShop"
                component={MyShopScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Drawer.Navigator>
    );

}