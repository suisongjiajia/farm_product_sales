# 农产品销售管理系统

一个基于前后端分离架构的农产品销售管理系统，提供用户管理、产品管理、订单管理等功能。

## 📁 项目结构

```
farm-product-sales/
├── backend/                 # 后端服务
│   ├── src/
│   │   ├── config/db.js     # MySQL数据库配置
│   │   ├── middleware/auth.js # JWT认证中间件
│   │   ├── routes/          # API路由
│   │   │   ├── products.js  # 产品管理API
│   │   │   ├── orders.js    # 订单管理API
│   │   │   └── users.js     # 用户管理API
│   │   └── server.js        # 服务器入口
│   ├── init.sql             # 数据库初始化脚本
│   ├── mock_data.sql        # 假数据脚本
│   ├── .env                 # 环境配置
│   └── package.json         # 后端依赖
└── frontend/                # 前端应用
    ├── src/
    │   ├── views/           # 页面组件
    │   ├── router/index.js  # 路由配置
    │   ├── store/index.js   # 状态管理
    │   ├── App.vue          # 根组件
    │   └── main.js          # 入口文件
    ├── index.html
    ├── vite.config.js       # 构建配置
    └── package.json         # 前端依赖
```

## ✨ 功能特性

### 用户管理
- 用户注册与登录
- JWT身份认证
- 个人信息管理
- 角色区分（管理员/普通用户）

### 产品管理
- 产品列表展示
- 添加/编辑/删除产品
- 产品搜索与分类筛选
- 库存管理

### 订单管理
- 创建订单
- 订单状态更新（待付款/已付款/已发货/已送达/已取消）
- 订单列表展示（管理员）
- 订单详情查看

### 购物车功能
- 添加商品到购物车
- 修改商品数量
- 删除商品
- 结算下单

## 🛠️ 技术栈

| 分类 | 技术 | 版本 |
|-----|------|------|
| 前端框架 | Vue | 3.x |
| 构建工具 | Vite | 6.x |
| UI组件库 | Element Plus | 2.x |
| 状态管理 | Pinia | 2.x |
| 路由 | Vue Router | 4.x |
| 后端框架 | Express | 4.x |
| 数据库 | MySQL | 8.x |
| 认证 | JWT | - |

## 🚀 快速开始

### 环境要求
- Node.js >= 18.x
- MySQL >= 8.0

### 安装步骤

#### 1. 克隆项目
```bash
git clone https://github.com/suisongjiajia/farm_product_sales.git
cd farm_product_sales
```

#### 2. 配置数据库
```bash
# 创建数据库
mysql -u your_username -p -e "CREATE DATABASE system_management;"

# 导入表结构
mysql -u your_username -p system_management < backend/init.sql

# 导入假数据（可选）
mysql -u your_username -p system_management < backend/mock_data.sql
```

#### 3. 配置环境变量
编辑 `backend/.env` 文件：
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=system_management
JWT_SECRET=your_jwt_secret_key
PORT=3002
```

#### 4. 安装依赖

**后端：**
```bash
cd backend
npm install
```

**前端：**
```bash
cd frontend
npm install
```

#### 5. 启动服务

**启动后端：**
```bash
cd backend
npm start
```

**启动前端（新终端）：**
```bash
cd frontend
npm run dev
```

### 访问地址
- 前端页面：http://localhost:3001
- 后端API：http://localhost:3002

## 🔐 默认账号

| 用户名 | 密码 | 角色 |
|-------|------|------|
| admin | admin123 | 管理员 |
| customer1 | admin123 | 普通用户 |
| customer2 | admin123 | 普通用户 |
| customer3 | admin123 | 普通用户 |
| customer4 | admin123 | 普通用户 |
| customer5 | admin123 | 普通用户 |

## 📄 API 接口

### 用户接口
| 方法 | 路径 | 说明 |
|-----|------|------|
| POST | /api/users/register | 用户注册 |
| POST | /api/users/login | 用户登录 |
| GET | /api/users | 获取用户列表（管理员） |

### 产品接口
| 方法 | 路径 | 说明 |
|-----|------|------|
| GET | /api/products | 获取产品列表 |
| POST | /api/products | 添加产品（管理员） |
| PUT | /api/products/:id | 更新产品（管理员） |
| DELETE | /api/products/:id | 删除产品（管理员） |

### 订单接口
| 方法 | 路径 | 说明 |
|-----|------|------|
| GET | /api/orders | 获取所有订单（管理员） |
| GET | /api/orders/user | 获取当前用户订单 |
| POST | /api/orders | 创建订单 |
| PUT | /api/orders/:id | 更新订单状态（管理员） |
| DELETE | /api/orders/:id | 删除订单（管理员） |

## 📝 开发说明

### 代码规范
- 前端：使用 Vue 3 Composition API
- 后端：使用 Express 中间件模式
- 数据库：使用 MySQL 关系型数据库

### 开发流程
1. 安装依赖
2. 配置数据库
3. 启动开发服务器
4. 编写代码
5. 提交代码

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！