import { CircleFade } from 'react-native-animated-spinkit';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Loading 组件：自带遮罩、动画、文字
export function AppLoaderSpinner({ animating = false }) {
  return (
    // 遮罩层：绝对定位覆盖全屏，背景半透，允许点击穿透（避免阻塞页面）
    <View style={[styles.mask, animating ? styles.maskVisible : styles.maskHidden]}>
      {/* 内容层：固定定位，不受遮罩穿透影响，确保动画和文字始终可交互 */}
      <View style={styles.content}>
        <CircleFade size={50} color="white" animating={animating} />
        <Text style={styles.text}>Loading</Text>
      </View>
    </View>
  );
}

// 样式分离：用条件判断控制显隐，避免直接用 display: 'none'（RN 更推荐 opacity + zIndex）
const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // 关键：遮罩背景半透，文字/动画在子 View 中不受穿透影响
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    pointerEvents: 'none', // 允许点击穿透遮罩
  },
  maskVisible: {
    zIndex: 9999,
    opacity: 1,
  },
  maskHidden: {
    zIndex: -1,
    opacity: 0,
  },
  content: {
    position: 'relative',
    zIndex: 1, // 确保内容在遮罩之上（即使遮罩穿透，内容仍可交互）
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
  },
});