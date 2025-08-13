**学习文档参考：**

[RN官网](https://www.react-native.cn/docs/turbo-native-modules-introduction)

[React Hooks](https://zh-hans.react.dev/reference/react/hooks)

[ahooks](https://ahooks.js.org/zh-CN/hooks/use-request/basic)

### react native 学习概要

#### 1.**react**

React Native是基于React的，在开发React Native过程中少不了的需要用到React方面的知识。

1. 当数据改变时，React将高效的更新和渲染需要更新的组件。声明性视图使你的代码更可预测，更容易调试。
2. 构建封装管理自己的状态的组件，然后将它们组装成复杂的用户界面。由于组件逻辑是用JavaScript编写的，而不是模板，所以可以轻松地通过您的应用程序传递丰富的数据，并保持DOM状态。
3. 学习React可以用于Web开发，也可以用于React Native来开发Android和iOS应用。

​	react native 初始化时，react、react-dom和 browser.min已被包含，其中，react.js 是 React 的核心库，react-dom.js 是提供与 DOM 相关的功能，browser.min.js 的作用是将 JSX 语法转为 JavaScript 语法，这一步很消耗时间，实际上线的时候，应该将它放到服务器完成。

​	**ReactDOM.render** 在 React Web 里是把 React 组件渲染到网页的某个 DOM 节点上。

而在 **React Native** 里，没有真实的浏览器 DOM，也没有 ReactDOM，所以没有对应的 `ReactDOM.render()` 方法。也不能直接使用html标签，只能使用自己的原生组件。

React Native 的启动和渲染流程是由它自己的原生桥接机制管理的，通常是在入口文件（比如 `index.js` 或 `App.js`）通过注册根组件来启动应用。



React Native 里对应的操作是：

```javascript
import { AppRegistry } from 'react-native';
import App from './App';

// 注册根组件，告诉系统用 App 作为入口组件
AppRegistry.registerComponent('YourAppName', () => App);
```

这里的 `AppRegistry.registerComponent` 就相当于 React Web 的 `ReactDOM.render`，它负责把 React 组件挂载到原生应用的根视图上。



#### 2.**JSX**

​	JSX 是一个看起来很像 XML 的 JavaScript 语法扩展。 每一个XML标签都会被JSX转换工具转换成纯JavaScript代码，使用JSX，组件的结构和组件之间的关系看上去更加清晰。

~~~javascript
return (
  <View>
    <Text>Hello</Text>
  </View>
);
~~~

**jSX延展属性**

~~~javascript
  var props = {};
  props.foo = x;
  props.bar = y;
  var component = <Component {...props} />;
~~~

... 标记被叫做延展操作符,可以和其它属性一起用，但要注意顺序，放在其他属性前面，否则会会覆盖掉前面的属性值。

#### 3.JavaScript 表达式

1.**属性表达式**：要使用 JavaScript 表达式作为属性值，只需把这个表达式用一对大括号 ({}) 包起来，不要用引号 ("")。

~~~javascript
// JSX:
var person = <Person name={window.isLoggedIn ? window.name : ''} />;
// 转为javascript:
var person = React.createElement(
  Person,
  {name: window.isLoggedIn ? window.name : ''}
);
~~~

2.**子节点表达式**

~~~javascript
var content = <Container>{window.isLoggedIn ? <Nav /> : <Login />}</Container>;
~~~

用花括号 `{}` 包裹的内容表示“插入表达式”的意思，表达式的结果会作为该组件的子节点。

3.**注释**

JSX 里添加注释只需要将注释用花括号包围，如

~~~javascript
class ReactDemo extends Component {
  render() {
    return (     
      <View style={styles.container}>
        {/*标签子节点的注释*/}
        <Text style={styles.welcome}
          textShadowColor='yellow'
          >
          React Native!
        </Text>
      </View>
    );
  }
}
~~~

#### 4.Component

##### 自定义组件类型

 React Native中的组件主要有以下几种类型：

1. 函数组件（Function Component）

- 以函数形式定义的组件，接收 `props` 作为参数，返回 JSX。
- 简洁、易写，React 推荐现在主要用这种。
- 可以用 React Hooks 来管理状态和副作用。

```jsx
function MyComponent(props) {
  return <Text>Hello, {props.name}</Text>;
}
// 或者箭头函数
const MyComponent = (props) => <Text>Hello, {props.name}</Text>;
```

2. 类组件（Class Component）

- 继承自 `React.Component` 或 `React.PureComponent` 的类。
- 通过 `this.props` 访问属性，有自己的状态 `this.state`。
- 需要实现 `render()` 方法返回 JSX。
- 之前 React 版本中管理状态和生命周期的主要方式，但现在多用函数组件替代。

```jsx
class MyComponent extends React.Component {
  render() {
    return <Text>Hello, {this.props.name}</Text>;
  }
}
```

3. 纯组件（PureComponent）

- 继承自 `React.PureComponent` 的类组件。
- 内部实现了**浅比较**，自动避免不必要的重新渲染。
- 适合性能优化场景。

```jsx
class MyComponent extends React.PureComponent {
  render() {
    return <Text>Hello, {this.props.name}</Text>;
  }
}
```

4. 高阶组件（HOC, Higher-Order Component）

- **接受一个组件作为参数，返回一个新的增强后的组件的函数。**
- 用来复用组件逻辑，比如**权限控制、数据获取**等。
- 典型写法：

```jsx
function withLogger(WrappedComponent) {
  return function(props) {
    console.log('Rendering:', WrappedComponent.name);
    return <WrappedComponent {...props} />;
  }
}
```

 **受控组件 & 非受控组件**

- 这是 React 里根据组件状态管理方式划分的概念。
- **受控组件**通过 props 或 state 控制内部值（比如表单输入）。

受控组件（Controlled Component）组件的值由 React 的 state 来控制。

用户输入时，事件（比如 `onChangeText`）会触发状态更新，组件的显示由状态决定。

通过 React 来控制输入内容。例如：

~~~javascript
const [text, setText] = useState('');

<TextInput
  value={text}                 // 值受 state 控制
  onChangeText={newText => setText(newText)}  // 输入时更新 state
/>
~~~

- **非受控组件**内部维护自己的状态，外部不控制。

非受控组件（Uncontrolled Component）组件自己维护内部状态，React 不直接控制它的值。可以用 `ref` 拿到组件实例，去读取或操作内部值，例如：

~~~javascript
const inputRef = useRef(null);

<TextInput
  ref={inputRef}
/>

// 需要时通过 ref 访问输入框的值
const getValue = () => {
  const val = inputRef.current ? inputRef.current._lastNativeText : '';
  console.log(val);
};
~~~



将代码封装成组件，可以像普通组件一样使用。

比如一下代码中的AppLoaderSpinner，AppToolBar，SelectGategoryBs就是封装好的组件。

~~~javascript
export default function MyShopScreen({ navigation }) {
  /*一些前置代码*/
  return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#e3d2c2" barStyle="light-content" />
            <AppLoaderSpinner animating={loading} />
            <AppToolBar navigation={navigation} label={"MyShop"} />
            <SelectGategoryBs />
            {/*其他代码*/}
				</View>
	);
}
~~~

-------

##### 组件属性

1.**如何传递和使用 props**

```jsx
function Greeting(props) {
  return <Text>Hello, {props.name}!</Text>;
}

// 使用
<Greeting name="张三" />
```

- 可以用解构赋值简写：

```jsx
function Greeting({ name }) {
  return <Text>Hello, {name}!</Text>;
}
```

2. **默认 props（defaultProps）**

- 组件可以定义默认属性，避免父组件不传值导致错误。

```jsx
Greeting.defaultProps = {
  name: '游客',
};
```

3.**PropTypes（类型检查）**

- 用于给 props 加类型约束，帮助开发调试（需安装 `prop-types` 包）。

```jsx
import PropTypes from 'prop-types';

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};
```

**typescript**会自动进行类型检查，无需下载安装 `prop-types`。

4.**Spread 属性（扩展运算符）**

- 可以用 `...` 语法快速传递多个 props。

```jsx
const otherProps = { name: '张三', age: 18 };
<Greeting {...otherProps} />
```

- 后写的同名属性会覆盖前面的。

5.**事件处理**

- React Native 组件的事件（如 `onPress`、`onChangeText`）通过 props 传递回调函数。

```jsx
<Button title="点击我" onPress={() => alert('点击了')} />
```

6. **样式作为属性**

- React Native 组件的样式一般通过 `style` 属性传入，支持对象或数组。

```jsx
<Text style={{ color: 'red', fontSize: 18 }}>你好</Text>

<Text style={[styles.text, { color: 'blue' }]}>你好</Text>
```

7. **props 不可变**

组件内部不能修改 props，只能读用，状态变化应通过 state 或父组件更新 props 来实现。

8. **函数作为属性（Render Props）**

- 也可以传入函数作为 prop，实现更灵活的渲染。

```jsx
<List renderItem={(item) => <Text>{item.name}</Text>} />
```

##### ref属性学习

在 React Native 里，**`ref` 属性**的用法和 React Web 基本一样，它是用来**获取组件实例或 DOM（在 RN 里是原生 UI 控件）引用**的工具。
 不过在 RN 里，因为没有浏览器 DOM，`ref` 返回的是 **React 组件实例对象或原生控件的句柄**，主要用于：

1.创建ref

React 提供了两种常用方法创建 `ref`：

**（1）`useRef` Hook（函数组件）**

```jsx
import React, { useRef } from 'react';
import { TextInput, Button } from 'react-native';

export default function App() {
  const inputRef = useRef(null);

  return (
    <>
      <TextInput ref={inputRef} placeholder="输入内容" />
      <Button title="获取焦点" onPress={() => inputRef.current.focus()} />
    </>
  );
}
```

- `inputRef.current` 指向 TextInput 的实例对象
- 可以调用它的原生方法，比如 `.focus()`、`.blur()` 等

**（2）`createRef`（类组件）**

```jsx
class MyComponent extends React.Component {
  inputRef = React.createRef();

  render() {
    return (
      <TextInput
        ref={this.inputRef}
        placeholder="输入内容"
      />
    );
  }
}
```

2.ref 的用途

**（1）操作原生 UI 控件方法**

RN 组件（比如 `TextInput`, `ScrollView`, `FlatList`）暴露了一些方法直接调用：

```jsx
inputRef.current.focus(); // 聚焦输入框
scrollViewRef.current.scrollTo({ y: 100, animated: true }); // 滚动
```

**（2）访问类组件方法**

如果封装了一个 **类组件**，外部可以通过 `ref` 调用它的方法：

```jsx
class CustomInput extends React.Component {
  focus() {
    console.log('调用了 focus');
  }
  render() {
    return <TextInput />;
  }
}

// 调用
const inputRef = useRef(null);
<CustomInput ref={inputRef} />;
inputRef.current.focus();
```

**（3）结合 `forwardRef` 传递 ref**

如果是函数组件，要让父组件的 ref 能获取到子组件内部的控件，需要用 **`React.forwardRef`**：

```jsx
const CustomInput = React.forwardRef((props, ref) => {
  return <TextInput ref={ref} {...props} />;
});

const parentRef = useRef(null);
<CustomInput ref={parentRef} />;
parentRef.current.focus();
```

**注意事项**

- RN 的 `ref` 不是直接返回原生控件，而是返回 **组件实例对象**，组件再通过 **桥接** 调用原生方法。
- **不要过度使用 ref**，React 官方建议优先用 **state + props** 控制 UI，ref 适合做 imperative 操作（命令式调用）。
- 对于 **函数组件**，不能直接用 `ref` 获取内部变量，必须配合 `forwardRef` 才能透传。

##### React native 内置组件

~~~mermaid
mindmap
  root((React Native 组件分类))
    布局容器类
      View
      KeyboardAvoidingView
      ImageBackground
    文本类
      Text
    输入交互类
      TextInput
      Pressable
      TouchableHighlight
      TouchableOpacity
      TouchableWithoutFeedback
      Switch
    列表与滚动类
      FlatList
      VirtualizedList
      SectionList
      ScrollView
      RefreshControl
    反馈与指示类
      ActivityIndicator
      Button
    状态与界面控制类
      Modal
      StatusBar
      Image
    平台特有组件
      Android
        DrawerLayoutAndroid
        TouchableNativeFeedback
      iOS
        InputAccessoryView
        SafeAreaView

~~~

##### 第三方组件库



#### 5.API

~~~mermaid
mindmap
  root((React Native API 学习分类))
    必学
      Alert
      Dimensions
      StyleSheet
      Platform
      Linking
      Keyboard
    重要
      Animated
        Animated.Value
        Animated.ValueXY
        Easing
        LayoutAnimation
      Appearance
      AppState
      Share
      Vibration
    场景工具
      AccessibilityInfo
      InteractionManager
      PanResponder
      PixelRatio
      PlatformColor
      RootTag
      I18nManager
    开发调试
      AppRegistry
      DevSettings
      Systrace
    低频或特殊
      Transform(变换)

~~~

#### 6.hook

~~~mermaid
mindmap
  root((React Native 可用 Hook))
    基础Hook
      useState
      useEffect
      useContext
      useReducer
      useRef
      useMemo
      useCallback
    React18+ Hook
      useDeferredValue
      useTransition
      useOptimistic
      useSyncExternalStore
    ahooks纯状态管理
      useSetState
      useBoolean
      useToggle
      useCounter
      useMap
      useSet
      usePrevious
      useGetState
      useResetState
    生命周期Hook
      useMount
      useUnmount
      useUnmountedRef
    工具函数Hook
      useDebounce
      useThrottle
      useDebounceFn
      useThrottleFn
      useLatest
      useMemoizedFn
      useCreation
    需适配Hook
      useNetwork
      useCountDown
      useControllableValue

~~~



#### 7.架构



#### 8.ES6

