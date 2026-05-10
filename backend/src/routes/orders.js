const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { auth, adminAuth } = require('../middleware/auth');

router.get('/', adminAuth, async (req, res) => {
  try {
    const [orders] = await pool.execute(`
      SELECT o.*, u.username, u.email 
      FROM orders o 
      JOIN users u ON o.user_id = u.id 
      ORDER BY o.created_at DESC
    `);
    
    const result = await Promise.all(orders.map(async (order) => {
      const [items] = await pool.execute(`
        SELECT oi.*, p.name 
        FROM order_items oi 
        JOIN products p ON oi.product_id = p.id 
        WHERE oi.order_id = ?
      `, [order.id]);
      return {
        ...order,
        userId: { id: order.user_id, username: order.username, email: order.email },
        products: items.map(item => ({
          productId: { id: item.product_id, name: item.name },
          quantity: item.quantity,
          price: item.price
        }))
      };
    }));
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/user', auth, async (req, res) => {
  try {
    const [orders] = await pool.execute(`
      SELECT o.* 
      FROM orders o 
      WHERE o.user_id = ? 
      ORDER BY o.created_at DESC
    `, [req.user.id]);
    
    const result = await Promise.all(orders.map(async (order) => {
      const [items] = await pool.execute(`
        SELECT oi.*, p.name 
        FROM order_items oi 
        JOIN products p ON oi.product_id = p.id 
        WHERE oi.order_id = ?
      `, [order.id]);
      return {
        ...order,
        products: items.map(item => ({
          productId: { id: item.product_id, name: item.name },
          quantity: item.quantity,
          price: item.price
        }))
      };
    }));
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const [orders] = await pool.execute(`
      SELECT o.*, u.username, u.email 
      FROM orders o 
      JOIN users u ON o.user_id = u.id 
      WHERE o.id = ?
    `, [req.params.id]);
    
    if (orders.length === 0) {
      return res.status(404).json({ message: '订单不存在' });
    }
    
    const order = orders[0];
    if (order.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: '无权访问此订单' });
    }
    
    const [items] = await pool.execute(`
      SELECT oi.*, p.name 
      FROM order_items oi 
      JOIN products p ON oi.product_id = p.id 
      WHERE oi.order_id = ?
    `, [order.id]);
    
    res.json({
      ...order,
      userId: { id: order.user_id, username: order.username, email: order.email },
      products: items.map(item => ({
        productId: { id: item.product_id, name: item.name },
        quantity: item.quantity,
        price: item.price
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { products, shippingAddress } = req.body;
    
    let totalAmount = 0;
    
    for (const item of products) {
      const [productRows] = await pool.execute('SELECT * FROM products WHERE id = ?', [item.productId]);
      if (productRows.length === 0) {
        return res.status(404).json({ message: `产品不存在` });
      }
      const product = productRows[0];
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `${product.name} 库存不足` });
      }
      totalAmount += product.price * item.quantity;
    }
    
    const [orderResult] = await pool.execute(
      'INSERT INTO orders (user_id, total_amount, shipping_address) VALUES (?, ?, ?)',
      [req.user.id, totalAmount, shippingAddress]
    );
    
    const orderId = orderResult.insertId;
    
    for (const item of products) {
      const [productRows] = await pool.execute('SELECT * FROM products WHERE id = ?', [item.productId]);
      const product = productRows[0];
      
      await pool.execute(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.productId]
      );
      
      await pool.execute(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.productId, item.quantity, product.price]
      );
    }
    
    res.status(201).json({ message: '订单创建成功', orderId });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const [result] = await pool.execute(
      'UPDATE orders SET status = ? WHERE id = ?',
      [req.body.status, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '订单不存在' });
    }
    const [updatedOrder] = await pool.execute('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    res.json(updatedOrder[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM orders WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '订单不存在' });
    }
    res.json({ message: '订单删除成功' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;