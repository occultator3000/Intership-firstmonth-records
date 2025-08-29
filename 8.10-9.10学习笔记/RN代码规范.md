## 一、编程规范

### 1. 命名规则

- **【强制】** 命名禁止以`$`或`_`开头 / 结尾

- **【强制】** 禁止使用拼音命名，需使用有明确含义的英文单词；避免模糊词汇（如`data`、`info`）

- **【强制】** 类名：采用首字母大写的驼峰式命名（PascalCase）
  示例：`LoginPage`、`MessageDialog`、`UserProfile`

- **【强制】** 方法名、参数名、成员变量、局部变量：采用首字母小写的驼峰式命名（camelCase）
  示例：`getUserInfo()`、`inputUserName`、`localStorage`

- 【强制】

  常量：

  - 全大写字母，单词间用下划线分隔，命名需清晰明确（允许长命名）
    正例：`MAX_UPLOAD_FILE_SIZE`、`DEFAULT_TIMEOUT_MS`
    反例：`MAX_NUM`、`DEF_TM`
  - 必须先定义后使用
  - 按功能拆分到不同常量类文件（如配置相关放`ConfigConsts.js`，网络相关放`NetConsts.js`）

- **【强制】** 周知缩写可直接使用（需团队共识）
  示例：`userMsg`（替代`userMessage`）、`imgUrl`（替代`imageUrl`）、`btn`（替代`button`）

- **【强制】** 文件夹名：全部小写（多单词直接拼接，不使用分隔符）
  示例：`components`、`network`、`utils`

### 2. 格式规则

- **【推荐】** 简单条件判断优先使用三目运算符替代`if/else`
  示例：`const result = isSuccess ? '完成' : '失败';`

- **【推荐】** 避免在`if`条件中加入过多判断逻辑，复杂条件建议拆分为变量
  反例：`if (user && user.info && user.info.age > 18 && user.status === 'active') { ... }`
  正例：`const isActiveAdult = user?.info?.age > 18 && user?.status === 'active'; if (isActiveAdult) { ... }`

- 【强制】`switch`语句规范：

  - 每个`case`必须通过`break/return`终止，或注释说明继续执行的逻辑
  - 必须包含`default`语句并放在最后（即使无逻辑也需保留`default: break;`）
    示例：

  ```javascript
  switch (status) {
    case 'success':
      showSuccess();
      break;
    case 'error':
      showError();
      // 继续执行default逻辑
    default:
      resetStatus();
      break;
  }
  ```

- 【强制】

  空格使用规范：

  - `if/for/while/switch/do`等关键字与括号间必须加空格
    示例：`if (condition) { ... }`（正确）；`if(condition){ ... }`（错误）
  - 运算符两侧必须加空格
    示例：`a + b`（正确）；`a+b`（错误）；`x = y * 2`（正确）
  - 缩进使用 4 个空格，禁止使用 Tab
  - 方法参数定义 / 传入时，逗号后必须加空格
    示例：`function formatUser(name, age, gender) { ... }`

- 【强制】 

  换行规则：

  - 运算符与后续内容一起换行

  - 方法链式调用时，每个方法单独换行

    示例：

    ```javascript
    const path = Path()
        .moveTo(0, -radius/2)
        .arc(0, radius, 1)
        .arc(0, -radius, 1)
        .close();
    ```

  - 多参数超长时，逗号后换行

- **【推荐】** 代码块分隔：方法体内的执行语句组、变量定义组、不同业务逻辑间用空行分隔

### 3. package.json 规范

- **【强制】** 使用 npm 安装依赖时，必须添加`--save`（或`-S`）确保依赖写入`package.json`
  示例：`npm install axios --save`（生产依赖）；`npm install eslint --save-dev`（开发依赖）

- **【强制】** 使用 Git 管理代码时，`node_modules`文件夹必须加入`.gitignore`，禁止上传
  （原因：体积大、可通过`package.json`重新安装、不同环境依赖可能冲突）

- 【强制】

  项目必须包含`README.md`，内容需包括：

  - 项目简介、功能说明
  - 环境配置（Node 版本、RN 版本等）
  - 启动 / 打包命令
  - 注意事项（如特殊依赖、后端接口地址等）

- 【推荐】

  版本管理：

  - 项目内部依赖使用`~`锁定小版本（如`~1.2.3`，允许更新到`1.2.x`）
  - 第三方通用组件可使用`^`允许兼容更新（如`^2.3.4`，允许更新到`2.x.x`）
  - RN 核心库需团队统一版本，避免兼容性问题

### 4. 注释规则

- 【强制】

  JS 文件头部必须有注释，格式：

  ```javascript
  /**
   * 文件名：UserService.js
   * 开发者：Zhang San
   * 开发时间：2024-08-29
   * 文件用途：用户相关接口封装（登录、注册、信息修改等）
   */
  ```

- 【强制】

  所有方法必须有注释，包含：功能说明、参数说明、返回值说明

  示例：

  ```javascript
  /**
   * 验证用户手机号格式
   * @param {string} phone - 待验证的手机号
   * @returns {boolean} 验证结果（true：格式正确，false：格式错误）
   */
  validatePhone = (phone) => { ... }
  ```

- **【强制】** 所有常量必须有注释，说明用途和取值范围（可选）
  示例：`const MAX_LOGIN_RETRY = 3; // 最大登录重试次数`

- 【参考】

  注释掉的代码需附加说明：

  - 标记是否临时注释（如`// 临时注释，后续需支持多语言`）
  - 完全废弃的代码建议删除（Git 历史可追溯）

- **【参考】** 多人协作同一文件时，关键修改需标注修改人
  示例：`// 2024-08-30 Li Si：修复XX场景下的空指针问题`

### 5. 日志规则

- **【推荐】** 开发阶段可使用`console.log()`调试，但发布前需清理或替换

- 【强制】

  利用 RN 全局变量

  ```
  __DEV__
  ```

  区分环境，发布时屏蔽日志：

  ```javascript
  if (!__DEV__) {
    // 生产环境：清空所有日志方法
    global.console = {
      info: () => {},
      log: () => {},
      warn: () => {},
      error: () => {}
    };
  }
  ```

  （建议放在项目入口文件`index.js`中）

## 二、RN 项目目录结构规范

```plaintext
项目根目录/
├── index.js               # 项目入口（RN 0.50+版本要求）
├── app.js                 # 路由入口（配置页面导航关系）
├── app/
│   ├── components/        # 公共组件（文件名以Component结尾）
│   │   ├── purecomponent/ # 无状态组件（仅通过props接收数据，无state）
│   │   └── ...            # 其他业务组件（如ButtonComponent、DialogComponent）
│   ├── pages/             # 完整页面（路由配置使用，文件名以Page结尾）
│   │   ├── LoginPage.js   # 登录页
│   │   ├── HomePage.js    # 首页
│   │   └── ...
│   ├── config/            # 配置项
│   │   ├── ApiConsts.js   # 接口地址常量
│   │   ├── RouteConsts.js # 路由配置
│   │   └── LangConsts.js  # 多语言配置
│   ├── utils/             # 工具函数（非UI组件）
│   │   ├── DateUtils.js   # 日期处理工具
│   │   ├── NetUtils.js    # 网络请求工具
│   │   └── ...
│   └── style/             # 全局样式
│       ├── GlobalStyle.js # 全局样式变量（如颜色、字体大小）
│       └── ...
├── resources/             # 静态资源
│   ├── images/            # 图片资源（按分辨率分目录：mdpi、hdpi等）
│   ├── audio/             # 音频资源
│   ├── video/             # 视频资源
│   └── data/              # 静态JSON数据
└── redux/（可选）         # 状态管理（如需使用redux）
    ├── actions/           # 动作定义
    ├── reducers/          #  reducer定义
    ├── store.js           #  store配置
    └── constants.js       #  redux常量
```

## 三、RN 页面开发规范

### 1. state 与 props 规范

- 【强制】`state`初始化必须在`constructor(props)`

  中，且每个变量需加注释

  示例：

  ```javascript
  constructor(props) {
    super(props);
    this.state = {
      userName: '', // 用户名（用户输入）
      isLoading: false, // 是否显示加载中状态
      userList: [] // 用户列表数据
    };
  }
  ```

- 【强制】使用`setState`时，如需依赖更新后的数据，必须使用回调函数

  示例：

  ```javascript
  this.setState({
    count: this.state.count + 1
  }, () => {
    // 确保state已更新后执行
    console.log('更新后的count：', this.state.count);
  });
  ```

- 【强制】`props`

  必须进行类型检测（`propTypes`）和默认值（`defaultProps`）设置

  示例：

  ```javascript
  import PropTypes from 'prop-types';
  
  class UserCard extends React.Component {
    static propTypes = {
      userId: PropTypes.string.isRequired, // 用户ID（必传）
      userName: PropTypes.string, // 用户名
      age: PropTypes.number, // 年龄（大于0）
      onTap: PropTypes.func // 点击回调函数
    };
  
    static defaultProps = {
      userName: '未知用户',
      age: 0,
      onTap: () => {}
    };
  }
  ```

- 【强制】自定义方法必须使用箭头函数（确保`this`指向正确）

  示例：

  ```javascript
  // 正确：箭头函数自动绑定this
  handleSubmit = () => {
    this.api.submitData();
  };
  
  // 错误：普通函数需手动绑定this，易遗漏
  handleSubmit() { ... }
  ```

- **【推荐】** 初始化数据（如远程接口请求、配置读取）建议在`componentWillMount`中执行

- 【强制】

  组件中使用的定时器、事件监听（如`addEventListener`），必须在`componentWillUnmount`中销毁

  示例：

  ```javascript
  componentDidMount() {
    this.timer = setInterval(() => { ... }, 1000);
    this.keyboardListener = Keyboard.addListener('keyboardDidShow', () => { ... });
  }
  
  componentWillUnmount() {
    clearInterval(this.timer); // 清除定时器
    this.keyboardListener.remove(); // 移除事件监听
  }
  ```

- **【强制】** 本地图片必须显式设置宽高，并适配不同屏幕
  示例：`<Image source={require('../resources/images/avatar.png')} style={{ width: 50, height: 50 }} />`

- **【强制】** RN 版本＜46 时，需为不同尺寸屏幕提供对应图片，命名格式为`图片名@n x.png`（如`icon@2x.png`、`icon@3x.png`）

### 2. 样式规则

- 【强制】

  样式属性≥3 个时，必须使用`StyleSheet.create`创建；＜3 个可使用行内样式

  示例：

  ```javascript
  // 推荐：样式属性多，使用StyleSheet
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
      justifyContent: 'center'
    }
  });
  
  // 允许：样式属性少，使用行内样式
  <View style={{ width: 100, height: 100 }} />
  ```

- 【推荐】

  建立全局样式文件（如`app/style/GlobalStyle.js`）管理公用样式（如主题色、字体大小、边距）

  示例：

  ```javascript
  // GlobalStyle.js
  export default {
    themeColor: '#1e90ff',
    fontSize: {
      small: 12,
      medium: 14,
      large: 16
    },
    margin: {
      xs: 4,
      sm: 8,
      md: 16
    }
  };
  ```

### 3. 变量声明规范

- **【强制】** 常量使用`const`（不可修改，修改会报错）
  示例：`const PI = 3.14159;`
- **【推荐】** 变量使用`let`（块级作用域，避免变量提升问题）
  示例：`let currentPage = 1; currentPage += 1;`
- **【禁止】** 禁止使用`var`（函数级作用域，易引发变量污染）

### 4. 语法规范

- 【强制】必须使用 ES6 + 语法，包括：
  - 箭头函数（`() => {}`）
  - 解构赋值（`const { name, age } = user;`）
  - 模板字符串（`const info = \`，{age} 岁 `;`）
  - `import/export`（替代`require/module.exports`）

## 四、组件与项目入口规范

### 1. 组件引用与变量定义

- 【强制】 

  组件引用顺序：

  1. React 核心库（`import React from 'react';`）
  2. React Native 组件（`import { View, Text } from 'react-native';`）
  3. npm 第三方组件（`import axios from 'axios';`）
  4. 自定义组件 / 工具（`import UserCard from '../components/UserCardComponent';`）

- **【强制】** 变量、常量初始化必须放在组件引用之后

- **【推荐】** 及时删除未使用的组件、变量、常量（可通过 ESLint 检测）

### 2. 项目入口规范

- 【强制】

  RN 0.50 + 版本中，`index.js`为应用入口，`app.js`

  为路由入口

  示例（`index.js`）：

  ```javascript
  import { AppRegistry } from 'react-native';
  import App from './app';
  AppRegistry.registerComponent('MyApp', () => App);
  ```

- **【强制】** RN 开发采用组件化、颗粒化思想，禁止使用后端 MVC/MVVM 等模式；如需状态管理，推荐使用 Redux 并遵循其结构规范

## 五、版本升级与代码迁移策略

- **【强制】** 未发布的 APP 或开发中的项目，应使用最新稳定版 RN 及依赖组件

- 【强制】

  低版本 APP 迭代升级时：

  1. 升级前必须通过 Git 创建分支备份当前代码（如`backup/v1.2.0`）
  2. 新建基于最新版本的项目（保持同名），逐步迁移代码并适配新 API
  3. 迁移后需全量测试，确保功能兼容

## 六、其他建议

- 【推荐】

  使用 ESLint 进行代码检查，配置与团队规范一致的规则：

  1. 安装依赖：`npm install eslint eslint-plugin-react eslint-plugin-react-native --save-dev`
  2. 配置`.eslintrc.js`文件定义规则
  3. 在 IDE 中开启自动检查，或集成到 CI 流程

- **【推荐】** 使用 Prettier 自动格式化代码，保持团队代码风格一致

- **【推荐】** 定期进行代码评审（Code Review），确保规范落地