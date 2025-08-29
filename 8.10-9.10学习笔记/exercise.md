# 文档目的：

基于朴朴APP首页模拟实现前端需求开发

# 需求分析

<img src="/Users/pupu/Library/Containers/com.tencent.qq/Data/Library/Application Support/QQ/nt_qq_77198b1440654beb5771fdf440757b73/nt_data/Pic/2025-08/Ori/6b9d79b595bcffd5ad74da6326aa75b9.jpg" alt="6b9d79b595bcffd5ad74da6326aa75b9" style="zoom: 20%;" /><img src="/Users/pupu/Library/Containers/com.tencent.qq/Data/Library/Application Support/QQ/nt_qq_77198b1440654beb5771fdf440757b73/nt_data/Pic/2025-08/Ori/404744460e84fecff0599b67dbe6715d.jpg" alt="404744460e84fecff0599b67dbe6715d" style="zoom:20%;" /><img src="/Users/pupu/Library/Containers/com.tencent.qq/Data/Library/Application Support/QQ/nt_qq_77198b1440654beb5771fdf440757b73/nt_data/Pic/2025-08/Ori/324ebb13adcca57220ede9f76aa89e1f.jpg" alt="324ebb13adcca57220ede9f76aa89e1f" style="zoom:20%;" />

## 1.初步实现需求：

1. 展示定位（如「红星商务大厦」 ）、搜索栏，支持商品/活动搜索

2. 轮播图模块：展示banner（如「周末出游指南」 ），支持点击跳转

3. 分类导航：多组图标+文字分类（水果鲜花、蔬菜豆制品等 ），可配置跳转

4. 营销活动区：大促 banner（如月中半价日 ）、会员/专题活动模块（开年卡会员、开海节 ）

5. 限时抢购：倒计时+商品列表，突出 urgency

6. 底部 Tab：推荐、分类、直播、购物车、我的，实现页面切换

### 一、需求与目录结构映射

| 功能模块             | 对应目录                                                   | 说明                                                         |
| -------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| **定位 + 搜索栏**    | `components/business/StoreSelector`、`components/ui/Input` | 定位组件放业务组件目录；搜索栏用基础 UI Input 组件，支持搜索事件回调。 |
| **轮播图（Banner）** | `components/business/Banner`                               | 新建业务组件 `Banner`，支持传入图片数组和跳转链接。          |
| **分类导航**         | `components/business/CategoryNav`                          | 新建 `CategoryNav` 组件，支持配置图标、文字、跳转。          |
| **营销活动区**       | `containers/Modules/MarketingActivity`                     | 单独作为一个业务模块，内部可细分「会员活动」「专题活动」。   |
| **限时抢购**         | `containers/Modules/FlashSale`                             | 业务模块，包含倒计时（UI组件可复用 `components/ui/Countdown`）+商品列表。 |
| **底部 Tab**         | `layout/MainLayout.tsx`、`layout/Menu.tsx`                 | `MainLayout` 负责整体框架，`Menu` 用于底部导航切换。         |

### 二、项目结构建议

项目src结构

```
├── components
│   ├── ui
│   │   ├── Input                   # 搜索输入框
│   │   ├── Countdown               # 倒计时组件
│   │   └── ...
│   ├── business
│   │   ├── StoreSelector           # 定位组件
│   │   ├── Banner                  # 轮播图
│   │   ├── CategoryNav              # 分类导航
│   │   └── ...
│
├── layout
│   ├── MainLayout.tsx               # 主框架
│   ├── Menu.tsx                     # 底部Tab
│   ├── Header.tsx                   # 顶部导航栏
│   └── ...
│
├── containers
│   ├── Modules
│   │   ├── MarketingActivity        # 营销活动
│   │   ├── FlashSale                # 限时抢购
│   │   └── ...
│
├── router
│   └── index.ts                     # 路由总出口
│
├── services
│   ├── home.ts                      # 首页接口
│   └── ...
│
├── store
│   └── ...                           # redux 或其他状态管理
│
├── utils
│   ├── http.ts                       # 请求封装
│   ├── time.ts                       # 倒计时工具
│   └── ...
│
├── App.tsx
└── index.ts
```

### 三、实现优先级建议

1. **基础框架**
    先搭 `MainLayout` + `Menu`，保证页面切换可用。
2. **首页骨架**
    Header（定位+搜索） → Banner → 分类导航 → 营销活动 → 限时抢购。
3. **数据接入**
    接口封装到 `services/home.ts`，本地先用 mock 数据。
4. **样式优化**
    各组件的 `.less` 文件分离，方便主题调整。
5. **状态管理**
    如果要支持购物车、登录信息等，放 `store` 里统一管理。

------

