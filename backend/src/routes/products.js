const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { adminAuth } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '产品不存在' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, category, price, stock, description, image } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO products (name, category, price, stock, description, image) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category, price, stock || 0, description || '', image || '']
    );
    const [newProduct] = await pool.execute('SELECT * FROM products WHERE id = ?', [result.insertId]);
    res.status(201).json(newProduct[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, category, price, stock, description, image } = req.body;
    await pool.execute(
      'UPDATE products SET name = ?, category = ?, price = ?, stock = ?, description = ?, image = ? WHERE id = ?',
      [name, category, price, stock, description, image, req.params.id]
    );
    const [updatedProduct] = await pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (updatedProduct.length === 0) {
      return res.status(404).json({ message: '产品不存在' });
    }
    res.json(updatedProduct[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '产品不存在' });
    }
    res.json({ message: '产品删除成功' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;