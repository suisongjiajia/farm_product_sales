const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: '访问被拒绝，需要登录' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [decoded.id]);
    if (users.length === 0) {
      return res.status(401).json({ message: '用户不存在' });
    }
    req.user = users[0];
    next();
  } catch (err) {
    res.status(401).json({ message: '无效的token' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: '访问被拒绝，需要登录' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [decoded.id]);
    if (users.length === 0 || users[0].role !== 'admin') {
      return res.status(403).json({ message: '权限不足，需要管理员权限' });
    }
    req.user = users[0];
    next();
  } catch (err) {
    res.status(401).json({ message: '无效的token' });
  }
};

module.exports = { auth, adminAuth };