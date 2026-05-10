require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const products = [
  { name: '有机大米', category: '粮油', price: 29.90, stock: 500, description: '优质有机大米，口感细腻，营养丰富', image: 'https://via.placeholder.com/200' },
  { name: '新鲜蔬菜礼盒', category: '蔬菜', price: 49.80, stock: 200, description: '精选当季新鲜蔬菜，健康营养', image: 'https://via.placeholder.com/200' },
  { name: '土鸡蛋', category: '蛋类', price: 19.90, stock: 1000, description: '农家散养土鸡蛋，营养美味', image: 'https://via.placeholder.com/200' },
  { name: '花生油', category: '粮油', price: 68.00, stock: 300, description: '纯正花生油，香浓可口', image: 'https://via.placeholder.com/200' },
  { name: '有机苹果', category: '水果', price: 15.80, stock: 800, description: '山东红富士苹果，脆甜多汁', image: 'https://via.placeholder.com/200' },
  { name: '新鲜猪肉', category: '肉类', price: 35.50, stock: 150, description: '农家散养猪肉，肉质鲜嫩', image: 'https://via.placeholder.com/200' },
  { name: '有机牛奶', category: '乳制品', price: 58.00, stock: 400, description: '新鲜有机牛奶，营养丰富', image: 'https://via.placeholder.com/200' },
  { name: '香菇', category: '蔬菜', price: 12.50, stock: 600, description: '鲜嫩香菇，香气扑鼻', image: 'https://via.placeholder.com/200' },
  { name: '蜂蜜', category: '干货', price: 88.00, stock: 250, description: '纯天然蜂蜜，香甜可口', image: 'https://via.placeholder.com/200' },
  { name: '核桃', category: '干货', price: 45.00, stock: 350, description: '精选核桃，补脑佳品', image: 'https://via.placeholder.com/200' },
  { name: '橙子', category: '水果', price: 18.90, stock: 700, description: '赣南脐橙，酸甜可口', image: 'https://via.placeholder.com/200' },
  { name: '草鱼', category: '水产', price: 28.00, stock: 200, description: '鲜活草鱼，肉质鲜美', image: 'https://via.placeholder.com/200' },
  { name: '豆腐', category: '豆制品', price: 5.50, stock: 500, description: '手工豆腐，嫩滑爽口', image: 'https://via.placeholder.com/200' },
  { name: '小米', category: '粮油', price: 18.00, stock: 600, description: '优质小米，营养早餐', image: 'https://via.placeholder.com/200' },
  { name: '胡萝卜', category: '蔬菜', price: 6.80, stock: 800, description: '新鲜胡萝卜，富含胡萝卜素', image: 'https://via.placeholder.com/200' }
];

const users = [
  { username: 'customer1', email: 'customer1@example.com', phone: '13800138001', address: '北京市朝阳区xxx街道' },
  { username: 'customer2', email: 'customer2@example.com', phone: '13800138002', address: '上海市浦东新区xxx路' },
  { username: 'customer3', email: 'customer3@example.com', phone: '13800138003', address: '广州市天河区xxx街' },
  { username: 'customer4', email: 'customer4@example.com', phone: '13800138004', address: '深圳市南山区xxx路' },
  { username: 'customer5', email: 'customer5@example.com', phone: '13800138005', address: '杭州市西湖区xxx路' }
];

async function initData() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('连接数据库成功');

    const hashedPassword = await bcrypt.hash('admin123', 10);

    for (const product of products) {
      await connection.execute(
        'INSERT INTO products (name, category, price, stock, description, image) VALUES (?, ?, ?, ?, ?, ?)',
        [product.name, product.category, product.price, product.stock, product.description, product.image]
      );
    }
    console.log('插入产品数据成功');

    for (const user of users) {
      await connection.execute(
        'INSERT INTO users (username, email, password, role, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
        [user.username, user.email, hashedPassword, 'customer', user.phone, user.address]
      );
    }
    console.log('插入用户数据成功');

    await connection.execute(
      'INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES (?, ?, ?, ?)',
      [2, 89.60, 'paid', '北京市朝阳区xxx街道123号']
    );
    await connection.execute(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
      [1, 1, 2, 29.90]
    );
    await connection.execute(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
      [1, 3, 2, 19.90]
    );
    console.log('插入订单数据成功');

    console.log('所有数据初始化完成！');

  } catch (err) {
    console.error('数据初始化失败:', err.message);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

initData();