INSERT INTO products (name, category, price, stock, description, image) VALUES
('有机大米', '粮油', 29.90, 500, '优质有机大米，口感细腻，营养丰富', 'https://via.placeholder.com/200'),
('新鲜蔬菜礼盒', '蔬菜', 49.80, 200, '精选当季新鲜蔬菜，健康营养', 'https://via.placeholder.com/200'),
('土鸡蛋', '蛋类', 19.90, 1000, '农家散养土鸡蛋，营养美味', 'https://via.placeholder.com/200'),
('花生油', '粮油', 68.00, 300, '纯正花生油，香浓可口', 'https://via.placeholder.com/200'),
('有机苹果', '水果', 15.80, 800, '山东红富士苹果，脆甜多汁', 'https://via.placeholder.com/200'),
('新鲜猪肉', '肉类', 35.50, 150, '农家散养猪肉，肉质鲜嫩', 'https://via.placeholder.com/200'),
('有机牛奶', '乳制品', 58.00, 400, '新鲜有机牛奶，营养丰富', 'https://via.placeholder.com/200'),
('香菇', '蔬菜', 12.50, 600, '鲜嫩香菇，香气扑鼻', 'https://via.placeholder.com/200'),
('蜂蜜', '干货', 88.00, 250, '纯天然蜂蜜，香甜可口', 'https://via.placeholder.com/200'),
('核桃', '干货', 45.00, 350, '精选核桃，补脑佳品', 'https://via.placeholder.com/200'),
('橙子', '水果', 18.90, 700, '赣南脐橙，酸甜可口', 'https://via.placeholder.com/200'),
('草鱼', '水产', 28.00, 200, '鲜活草鱼，肉质鲜美', 'https://via.placeholder.com/200'),
('豆腐', '豆制品', 5.50, 500, '手工豆腐，嫩滑爽口', 'https://via.placeholder.com/200'),
('小米', '粮油', 18.00, 600, '优质小米，营养早餐', 'https://via.placeholder.com/200'),
('胡萝卜', '蔬菜', 6.80, 800, '新鲜胡萝卜，富含胡萝卜素', 'https://via.placeholder.com/200');

INSERT INTO users (username, email, password, role, phone, address) VALUES
('customer1', 'customer1@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', 'customer', '13800138001', '北京市朝阳区xxx街道'),
('customer2', 'customer2@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', 'customer', '13800138002', '上海市浦东新区xxx路'),
('customer3', 'customer3@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', 'customer', '13800138003', '广州市天河区xxx街'),
('customer4', 'customer4@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', 'customer', '13800138004', '深圳市南山区xxx路'),
('customer5', 'customer5@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', 'customer', '13800138005', '杭州市西湖区xxx路');

INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES
(2, 89.60, 'paid', '北京市朝阳区xxx街道123号'),
(2, 145.50, 'shipped', '上海市浦东新区xxx路456号'),
(3, 68.00, 'delivered', '广州市天河区xxx街789号'),
(4, 126.80, 'pending', '深圳市南山区xxx路321号'),
(5, 176.00, 'paid', '杭州市西湖区xxx路654号');

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 2, 29.90),
(1, 3, 2, 19.90),
(2, 4, 1, 68.00),
(2, 6, 2, 35.50),
(3, 7, 1, 58.00),
(3, 1, 1, 29.90),
(4, 2, 2, 49.80),
(4, 5, 2, 15.80),
(4, 8, 2, 12.50),
(5, 9, 2, 88.00);
