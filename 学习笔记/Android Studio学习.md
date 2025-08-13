学习文档：

[android studio 官网](https://developer.android.com/studio/projects?hl=zh-cn)

### 1.项目新建

​	Android Studio新建项目时选择一个Activity模板作为默认MainActivity，先选择Empty Activity作为开始。接着，Minimum SDK指的是本项目所支持的最小安卓SDK，点击“Help me choose”会出现如下界面帮助选择合适的安卓最小SDK版本：

![help me choose](https://github.com/occultator3000/Intership-firstmonth-records/blob/main/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/images/help%20me%20choose.png)

​	其中CUMULATIVE DISTRIBUTION表示如果支持该安卓版本以上设备，则预估能支持安卓设备占所有安卓设备的百分比。可见Minimum SDK越小所能支持设备越多，但没有必要一味追求支持更多设备，这需要根据一定的市场调查与经验来决定。

### 2.项目结构

**安卓开发常见的开发模式有**`MVC`，`MVP`，`MVVM`等，其中**MVC**非常容易上手，结构清晰易懂，**MVP**在 MVC 基础上进一步解耦，将业务逻辑从 View 中抽离到 Presenter，使 View 只负责 UI 展示，不处理业务逻辑。**MVVM**通过数据绑定（Data Binding）让 View 和 ViewModel 自动关联，实现 “数据驱动 UI”，减少手动更新 UI 的代码。

**安卓项目文件及目录结构简介**

- 安卓应用配置文件`AndroidManifest.xml`: 用于配置包名、应用权限、应用图标及名称、主题等基本信息，此外包括了应用的Activity相关配置，没有在此进行注册的Activity是不能被启动的。

- 程序代码java: 在java目录下的对应包名中存放包括Activity在内的各java/kotlin程序文件。

- 资源文件res: 存放用于UI相关的各类资源，主要有:

  - drawable:存放可被绘制的图形，包括矢量图和位图，以及由xml编写的各类图层、状态选择器等比较实用的前端UI部件。
  - layout: 以xml文件形式编写的用户交互界面，可以在Android Studio中进行实时渲染预览、可视化编辑等。
  - values:
    - arrays.xml: 存放数组，在程序中按照自定义的数组名进行读取。
    - colors.xml: 存放Hex色值，在程序中按照自定义的颜色名字进行读取。
    - dimens.xml: 存放尺寸信息。
    - strings.xml: 存放字符串，按照自定义的字符串名进行获取，方便多语言程序的本土化。
    - themes
      - themes.xml: 程序主题，包括主色次色和各类样式。
      - themes.xml(night): 程序夜间主题。
  - mipmap: 存放贴图文件，如果期望贴图有放大缩小动画之类的可以获得更好的图像表现。
  - xml: 存放一些其它xml格式的文件，例如网络安全配置文件network_security_config。

- Gradle构建配置文件

  ```
  build.gradle
  ```

  - 项目级构建配置build.gradle(Project: $project_name)：用于配置适用于项目的Gradle构建设置，例如使用的Gradle版本，构建脚本的仓库，依赖包仓库。例如：

```none
// Top-level build file where you can add configuration options common to all sub-projects/modules.
buildscript {
    repositories {
		//这里放置项目构建仓库
        google()
        jcenter()
    }
    dependencies {
		//这里放置项目构建所需的依赖，而不是模块(总之平时用的依赖一般都不是放这里)的依赖
        classpath "com.android.tools.build:gradle:4.1.1"
        // NOTE: Do not place your application dependencies here; they belong in the individual module build.gradle files
    }
}

allprojects {
    repositories {
	//依赖包仓库，也就是依赖包从哪下载，一般使用国内镜像下载快很多
        maven{ url 'http://maven.aliyun.com/nexus/content/groups/public/'}//阿里云的仓库，便于下载依赖包
        maven{ url "https://jitpack.io"}
        google()
        jcenter()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

------

- 模块级构建配置build.gradle(Module: $project_name.app)

```none
…
dependencies {
//放置要用到的第三方依赖的地方
   
}
```

### 3.Gradle构建



### 4.安卓SDK 命令行工具学习

[命令行工具](https://developer.android.com/tools?hl=zh-cn)

可以使用`adb --help`查看命令









### 5.使用工具开发界面



### 6.代码编写学习



#### lint代码检查



#### 注解改进代码检查



### 7.程序理解重点

#### 7.1 **Activity和Fragment的生命周期**

~~~mermaid
flowchart TD
    A([Activity 创建开始]) --> B["onCreate()"]
    B --> C["onStart()"]
    C --> D["onResume()"]
    D --> E[Activity 正在运行]

    E -->|用户切到其他界面| F["onPause()"]
    F -->|Activity 仍可见| C2["onResume()"] 
    F -->|Activity 不可见| G["onStop()"]

    G -->|重新回到前台| C3["onRestart()"]
    C3 --> C

    G -->|被系统或用户销毁| H["onDestroy()"]
    A -.-> H

~~~

- `onCreate()`: Ativity被创建的时候，常用于初始化基本布局，使用setContentView()加载布局文件，进行一些其它基本不耗时间的操作，异步线程可以避免页面长时间空白。
- `onStart()`: Activity被展示的时候，也就是说被创建了不一定要显示出来，但要显示出来了才onStart()。
- `onPause()`: Activity将要被挂起的时候，页面失去焦点无法交互，此时Activity仍可见，比如将转入后台运行。
- `onResume()`:Activity已经从后台唤起并显示出来，将要但还未获得焦点无法操作的时候。
- `onStop()`: Activity以及失去焦点且要转入后台的时候，此时Activity已不可见。
- `onRestart()`: Activity被挂起后又被唤醒的时候，此时Activity还未显示出来。
- `onDestroy()`: Activity被彻底销毁的时候。

**Fragment生命周期**：

~~~mermaid
flowchart TD
    subgraph Activity
        A1[onCreate] --> A2[onStart] --> A3[onResume]
        A4[onPause] --> A5[onStop] --> A6[onDestroy]
    end

    subgraph Fragment
        F1[onAttach] --> F2[onCreate] --> F3[onCreateView]
        F3 --> F4[onActivityCreated] --> F5[onStart] --> F6[onResume]
        F7[onPause] --> F8[onStop] --> F9[onDestroyView]
        F9 --> F10[onDestroy] --> F11[onDetach]
    end

    %% 绑定 Activity 与 Fragment 生命周期
    A1 -.调用.-> F1
    F4 -.发生在.-> A1
    A2 -.调用.-> F5
    A3 -.调用.-> F6
    A4 -.调用.-> F7
    A5 -.调用.-> F8
    A5 -.可能同时调用.-> F9
    A6 -.调用.-> F10
    F10 -.最终调用.-> F11

~~~



Fragment生命周期与Activity周期较为类似，但其中比较值得提及的是：

- `onAttach()`：Fragment与Activity建立关联的时候，也就是此时Fragment已经知道了拥有自己的“上司”Activity是谁。
- `onActivityCreated()`：此时建立关联的Activity已经结束了onCreate()并返回。
- `onCreateView()`：此时初始化Fragment布局，也是将基本的布局加载好，议耗时间的操作需要用异步线程。
- `onDestroyView()`：Fragment的视图已经被销毁，但与Activity的关联未销毁，仍然可以重新创建视图。
- `onDetach()`：与Activity的关联将要被解除，Activity在onDestory()时会自动调用与之有关联的Fragment的onDetach()方法。

#### 7.2 网络请求，异步线程



#### 7.3 handler和消息处理



#### 7.4 activity 跳转



####  7.5 回收型列表视图RecyclerView的使用



