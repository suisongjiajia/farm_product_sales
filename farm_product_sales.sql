/*
 Navicat Premium Dump SQL

 Source Server         : system_management
 Source Server Type    : MySQL
 Source Server Version : 80041 (8.0.41)
 Source Host           : localhost:3306
 Source Schema         : farm_product_sales

 Target Server Type    : MySQL
 Target Server Version : 80041 (8.0.41)
 File Encoding         : 65001

 Date: 10/05/2026 19:31:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for order_items
-- ----------------------------
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT 1,
  `price` decimal(10, 2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `order_id`(`order_id` ASC) USING BTREE,
  INDEX `product_id`(`product_id` ASC) USING BTREE,
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_items
-- ----------------------------
INSERT INTO `order_items` VALUES (1, 1, 1, 2, 29.90);
INSERT INTO `order_items` VALUES (2, 1, 3, 2, 19.90);
INSERT INTO `order_items` VALUES (3, 2, 4, 1, 68.00);
INSERT INTO `order_items` VALUES (4, 2, 6, 2, 35.50);
INSERT INTO `order_items` VALUES (5, 3, 7, 1, 58.00);
INSERT INTO `order_items` VALUES (6, 3, 1, 1, 29.90);
INSERT INTO `order_items` VALUES (7, 4, 2, 2, 49.80);
INSERT INTO `order_items` VALUES (8, 4, 5, 2, 15.80);
INSERT INTO `order_items` VALUES (9, 4, 8, 2, 12.50);
INSERT INTO `order_items` VALUES (10, 5, 9, 2, 88.00);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total_amount` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `status` enum('pending','paid','shipped','delivered','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'pending',
  `shipping_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, 2, 89.60, 'paid', '北京市朝阳区xxx街道123号', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `orders` VALUES (2, 2, 145.50, 'shipped', '上海市浦东新区xxx路456号', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `orders` VALUES (3, 3, 68.00, 'delivered', '广州市天河区xxx街789号', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `orders` VALUES (4, 4, 126.80, 'pending', '深圳市南山区xxx路321号', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `orders` VALUES (5, 5, 176.00, 'paid', '杭州市西湖区xxx路654号', '2026-05-01 17:34:43', '2026-05-01 17:34:43');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `stock` int NOT NULL DEFAULT 0,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES (1, '有机大米', '粮油', 29.90, 500, '优质有机大米，口感细腻，营养丰富', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `products` VALUES (2, '新鲜蔬菜礼盒', '蔬菜', 49.80, 200, '精选当季新鲜蔬菜，健康营养', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `products` VALUES (3, '土鸡蛋', '蛋类', 19.90, 1000, '农家散养土鸡蛋，营养美味', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `products` VALUES (4, '花生油', '粮油', 68.00, 300, '纯正花生油，香浓可口', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `products` VALUES (5, '有机苹果', '水果', 15.80, 800, '山东红富士苹果，脆甜多汁', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `products` VALUES (6, '新鲜猪肉', '肉类', 35.50, 150, '农家散养猪肉，肉质鲜嫩', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `products` VALUES (7, '有机牛奶', '乳制品', 58.00, 400, '新鲜有机牛奶，营养丰富', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `products` VALUES (8, '香菇', '蔬菜', 12.50, 600, '鲜嫩香菇，香气扑鼻', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `products` VALUES (9, '蜂蜜', '干货', 88.00, 250, '纯天然蜂蜜，香甜可口', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `products` VALUES (10, '核桃', '干货', 45.00, 350, '精选核桃，补脑佳品', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `products` VALUES (11, '橙子', '水果', 18.90, 700, '赣南脐橙，酸甜可口', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `products` VALUES (12, '草鱼', '水产', 28.00, 200, '鲜活草鱼，肉质鲜美', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `products` VALUES (13, '豆腐', '豆制品', 5.50, 500, '手工豆腐，嫩滑爽口', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `products` VALUES (14, '小米', '粮油', 18.00, 600, '优质小米，营养早餐', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `products` VALUES (15, '胡萝卜', '蔬菜', 6.80, 800, '新鲜胡萝卜，富含胡萝卜素', 'https://via.placeholder.com/200', '2026-05-01 17:34:43', '2026-05-01 17:34:43');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` enum('admin','customer') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'customer',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', 'admin@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', 'admin', NULL, NULL, '2026-05-01 17:13:30', '2026-05-01 17:13:30');
INSERT INTO `users` VALUES (2, 'customer1', 'customer1@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', 'customer', '13800138001', '北京市朝阳区xxx街道', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `users` VALUES (3, 'customer2', 'customer2@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', 'customer', '13800138002', '上海市浦东新区xxx路', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `users` VALUES (4, 'customer3', 'customer3@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', 'customer', '13800138003', '广州市天河区xxx街', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `users` VALUES (5, 'customer4', 'customer4@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', 'customer', '13800138004', '深圳市南山区xxx路', '2026-05-01 17:34:43', '2026-05-01 17:34:43');
INSERT INTO `users` VALUES (6, 'customer5', 'customer5@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', 'customer', '13800138005', '杭州市西湖区xxx路', '2026-05-01 17:34:43', '2026-05-01 17:34:43');

SET FOREIGN_KEY_CHECKS = 1;
