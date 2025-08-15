**学习文档参考：**

[RN项目快速上手](https://github.com/reactnativecn/react-native-website/blob/production/archived_docs/version-0.68/_getting-started-macos-android.md)

- 1.1 按照学习文档依次安装HomeBrew、Node、Yarn/NPM 、JDK11、Android Studio

- 1.2 React Native CLI 安装与初始化项目：`npx @react-native-community/cli init YOUR-PROJECT`

- 1.3 Android 环境配置（Android Studio、模拟器/真机）

  - 使用Virtual Device 

  打开android studio -> 右上角打开Virtual Devices Manager->点击 **+**,再点击 **Create Virtual Device**->选择设备并下载系统映像（标有 **Google API** 的系统映像具有对 [Google Play 服务](https://developers.google.com/android/guides/overview?hl=zh-cn)的访问权限）

  ![截屏2025-08-12 10.32.28](/Users/pupu/Desktop/截屏2025-08-12 10.32.28.png)

  如需创建可调整大小的 Android 虚拟设备 (AVD)，选择 **Resizable (Experimental)** 手机硬件配置文件，下载适用于 API 级别 34 或更高级别的系统映像

  ![截屏2025-08-12 10.51.58](/Users/pupu/Desktop/截屏2025-08-12 10.51.58.png)

  - 使用真机设备

    选择**开发者选项**，然后启用 **USB 调试**

    - 项目运行调试：

    ~~~
    # 查看设备
    adb devices
    
    # 运行设备
    npx react-native run-android
    
    #选择设备运行
    npx react-native run-android --deviceId emulator-5554（设备ID）
    ~~~

    - 手机上报错误查看：`adb logcat | grep -i react`

- 1.4 Metro 服务与缓存管理

  - 开启Metro 

    ~~~
    npx react-native start           # 启动 Metro
    npx react-native start --reset-cache  # 强制清理缓存
    ~~~

  - 项目彻底清理和重新编译

    ~~~
    # 1. 删除 node_modules
    rm -rf node_modules
    
    # 2. 删除 android 构建缓存
    rm -rf android/build
    rm -rf android/app/build
    
    # 3. 再次安装依赖
    yarn install
    # 或 npm install
    
    # 4. 清理 gradle
    cd android
    ./gradlew clean
    cd ..
    
    # 5. 重启 Metro
    npx react-native start --reset-cache
    
    # 6. 重新编译安装
    npx react-native run-android
    ~~~

  - commands ：

    ~~~
       r  - reload app(s)
       d  - open Dev Menu
       j  - open DevTools
    ~~~

