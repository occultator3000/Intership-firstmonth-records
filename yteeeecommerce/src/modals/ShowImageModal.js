import { View, Modal, Image, Dimensions } from 'react-native';
import React from 'react';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { ComposedGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition';

export default function ShowImageModal({ visible, imageUri, onClose }) {
    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    // 
    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = e.scale;
        })
        .onEnd(() => {
            scale.value = withTiming(1);
        })

    //
    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = e.translationX;
            translateY.value = e.translationY;
        })
        .onEnd(() => {
            translateX.value = withTiming(0);
            translateY.value = withTiming(0);
        });

    const composedGesture= Gesture.Simultaneous(pinchGesture, panGesture);

    const animatedStyle = useAnimatedStyle(() => ({
        transform:[
            { scale: scale.value },
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
    }));
    

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={() => onClose()}
        >
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'black', // 黑色背景
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <GestureDetector gesture={composedGesture}>
                        <Animated.Image
                            source={{ uri: imageUri }}
                            style={[{ width: '100%', height: '100%' }, animatedStyle]}
                            resizeMode="contain"
                        />
                    </GestureDetector>
                </View>
            </GestureHandlerRootView>


        </Modal>

    );
}
