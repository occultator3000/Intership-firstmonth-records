import React from 'react';
//import { View, StyleSheet, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/splash';
import SigninScreen from './src/screens/signin';
import SignUpScreen from './src/screens/SignUp';
import PhoneLoginScreen from './src/screens/PhoneLogin';
import WelcomeScreen from './src/screens/welcome';
import SideNavigation from './src/screens/SideNavigation';
import OnboardingScreen from './src/screens/Onboarding';

import { Toast } from 'react-native-toast-message/lib/src/Toast';

const stack = createNativeStackNavigator();
const App = () => {

    
    return (
        <>
            <NavigationContainer>
                <stack.Navigator>

                    <stack.Screen
                        name="Splash"
                        component={SplashScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <stack.Screen
                        name="SignIn"
                        component={SigninScreen}
                        options={{
                            headerShown: false,
                        }}
                    />

                    <stack.Screen
                        name="SignUpScreen"
                        component={SignUpScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <stack.Screen
                        name="PhoneLogin"
                        component={PhoneLoginScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <stack.Screen
                        name="WelcomeScreen"
                        component={WelcomeScreen}
                        options={{
                            headerShown: false,
                        }}
                    />

                    <stack.Screen
                        name="SideNavigation"
                        component={SideNavigation}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <stack.Screen
                        name='OnBoardingScreen'
                        component={OnboardingScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                </stack.Navigator>

            </NavigationContainer>
            <Toast position="top" topOffset={50} visibilityTime={2000} />
        </>
    );
};

//const styles=StyleSheet.create({});

export default App;