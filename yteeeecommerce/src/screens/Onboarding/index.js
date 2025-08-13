import { View, Text, Dimensions, Image, Animated, TouchableOpacity, } from 'react-native';
import React, { useRef, useState } from 'react';
import { OnBoardingData } from '../../config/LocalAppData';
import { COLOR } from '../../config/Colors';


export default function OnBoardingScreen({navigation}) {

    const scrollx = useRef(new Animated.Value(0)).current;

    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef(null);
    const { width, height } = Dimensions.get("screen");

    const onViewableItemsChanged = info => {
        //console.log(info);
        setCurrentIndex(info.viewableItems[0].index)
    };

    const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

    const OnBoardingItem = ({ item }) => {
        return (
            <View style={{
                width: width,
                height: height,
                backgroundColor: item.color,
                justifyContent: 'center',
                padding: 20,
            }}>
                <Image
                    source={item.image}
                    style={{ width: '100%', flex: 0.5, resizeMode: "contain" }}
                />
                <Text style={{ fontSize: 20, fontWeight: '800' }}>{item.heading}</Text>
                <Text>{item.subHeading}</Text>
            </View>
        )
    };

    const Indicator = ({ scrollx }) => {
        return (
            <View style={{
                position: 'absolute',
                bottom: 60,
                flexDirection: 'row',
                alignSelf: 'center',
            }}>
                {
                    OnBoardingData.map((_, i) => {
                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                        const scale = scrollx.interpolate({
                            inputRange,
                            outputRange: [0.8, 1.4, 0.8],
                            extrapolate: 'clamp',
                        })
                        const opacity = scrollx.interpolate({
                            inputRange,
                            outputRange: [0.6, 0.9, 0.8],
                            extrapolate: 'clamp',
                        })
                        return (
                            <Animated.View
                                key={`indicator-${i}`}
                                style={{
                                    height: 10,
                                    width: 10,
                                    borderRadius: 5,
                                    backgroundColor: "#333",
                                    margin: 10,
                                    transform: [{ scale }],
                                    opacity,
                                }}
                            />
                        )
                    })
                }
            </View>
        )
    }

    function scrollTo() {
        if (currentIndex < OnBoardingData.length - 1) {
            slideRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            // 如果是最后一页，可以在这里处理完成逻辑，比如导航到登录页面
            navigation.navigate('SignIn');
        }
    }

    return (
        <View style={{ flex: 1 }}>

            <Animated.FlatList
                ref={slideRef}// 引用滑动列表
                style={{ flex: 1 }}
                data={OnBoardingData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <OnBoardingItem item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}//这是为了隐藏水平滚动条
                pagingEnabled={true}
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollx } } }],
                    { useNativeDriver: false },// 这是为了使用原生驱动
                )}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}// 这是为了处理可见项变化
            />
            <Indicator scrollx={scrollx} />
            <View style={{
                position: 'absolute',
                bottom: 10,
                alignSelf: 'center',

            }}>
                <TouchableOpacity style={{
                    borderRadius: 20,
                    backgroundColor: 'white',
                    paddingHorizontal: 30,
                    paddingVertical: 8,
                }}
                    onPress={() => scrollTo()}
                >
                    <Text style={{
                        color: COLOR.blue,
                    }}>
                        {
                            currentIndex == OnBoardingData.length - 1 ? "Finish" : "Next"
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}