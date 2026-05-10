const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('农产品销售管理系统后端服务运行中');
});

const startServer = async () => {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
  });
};

startServer();