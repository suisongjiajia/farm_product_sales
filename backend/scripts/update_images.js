require('dotenv').config();
const mysql = require('mysql2/promise');

const categories = {
  '粮油': ['rice', 'oil', 'flour', 'noodle', 'bean'],
  '蔬菜': ['carrot', 'tomato', 'potato', 'cabbage', 'lettuce'],
  '水果': ['apple', 'orange', 'banana', 'grape', 'pear'],
  '肉类': ['pork', 'beef', 'chicken', 'fish', 'lamb'],
  '蛋类': ['egg', 'duckegg', 'gooseegg'],
  '乳制品': ['milk', 'cheese', 'yogurt', 'butter'],
  '干货': ['nut', 'driedfruit', 'mushroom', 'seaweed'],
  '水产': ['fish', 'shrimp', 'crab', 'lobster'],
  '豆制品': ['tofu', 'soybean', 'tempeh']
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

    const [products] = await connection.execute('SELECT id, category FROM products');
    
    for (const product of products) {
      const catImages = categories[product.category] || ['vegetables'];
      const imageIndex = (product.id - 1) % catImages.length;
      const imageName = catImages[imageIndex];
      
      const newImage = `https://picsum.photos/seed/${imageName}${product.id}/200/200`;
      
      await connection.execute(
        'UPDATE products SET image = ? WHERE id = ?',
        [newImage, product.id]
      );
      
      console.log(`更新产品 ${product.id}: ${newImage}`);
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