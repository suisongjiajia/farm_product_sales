const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');
const { auth, adminAuth } = require('../middleware/auth');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;
    
    const [existingUser] = await pool.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: '用户名或邮箱已存在' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, phone, address) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, phone || '', address || '']
    );
    
    res.status(201).json({ message: '注册成功' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const [users] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
      return res.status(400).json({ message: '用户名或密码错误' });
    }
    
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '用户名或密码错误' });
    }
    
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', adminAuth, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, username, email, role, phone, address, created_at FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      phone: req.user.phone,
      address: req.user.address,
      createdAt: req.user.created_at
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/profile', auth, async (req, res) => {
  try {
    const { username, email, phone, address } = req.body;
    
    if (username) {
      const [existing] = await pool.execute(
        'SELECT id FROM users WHERE username = ? AND id != ?',
        [username, req.user.id]
      );
      if (existing.length > 0) {
        return res.status(400).json({ message: '用户名已存在' });
      }
    }
    
    if (email) {
      const [existing] = await pool.execute(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [email, req.user.id]
      );
      if (existing.length > 0) {
        return res.status(400).json({ message: '邮箱已存在' });
      }
    }
    
    await pool.execute(
      'UPDATE users SET username = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [username || req.user.username, email || req.user.email, phone || req.user.phone, address || req.user.address, req.user.id]
    );
    
    const [updatedUser] = await pool.execute(
      'SELECT id, username, email, role, phone, address FROM users WHERE id = ?',
      [req.user.id]
    );
    
    res.json(updatedUser[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '用户不存在' });
    }
    res.json({ message: '用户删除成功' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;