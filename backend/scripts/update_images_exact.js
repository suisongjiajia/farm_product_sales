require('dotenv').config();
const mysql = require('mysql2/promise');

const productImages = {
  '有机大米': 'rice',
  '新鲜蔬菜礼盒': 'vegetables',
  '土鸡蛋': 'eggs',
  '花生油': 'oil',
  '有机苹果': 'apple',
  '新鲜猪肉': 'meat',
  '有机牛奶': 'milk',
  '香菇': 'mushroom',
  '蜂蜜': 'honey',
  '核桃': 'nuts',
  '橙子': 'orange',
  '草鱼': 'fish',
  '豆腐': 'tofu',
  '小米': 'grains',
  '胡萝卜': 'carrot'
};

async function updateImages() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const [products] = await connection.execute('SELECT id, name FROM products');
    
    for (const product of products) {
      const imageSeed = productImages[product.name] || 'food';
      const newImage = `https://picsum.photos/seed/${imageSeed}${product.id}/200/200`;
      
      await connection.execute(
        'UPDATE products SET image = ? WHERE id = ?',
        [newImage, product.id]
      );
      
      console.log(`更新产品 "${product.name}": ${newImage}`);
    }
    
    console.log('所有产品图片链接已更新！');

  } catch (err) {
    console.error('更新图片链接失败:', err.message);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

updateImages();