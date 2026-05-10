<template>
  <div class="app-container">
    <header class="header">
      <div class="header-content">
        <div class="logo" @click="$router.push('/')">
          <span>🌾</span>
          <span>农产品销售管理系统</span>
        </div>
        <nav class="nav" v-if="store.state.user">
          <a href="/" @click.prevent="$router.push('/')">首页</a>
          <a href="/products" @click.prevent="$router.push('/products')">产品</a>
          <a href="/cart" @click.prevent="$router.push('/cart')" class="cart-link">
            购物车
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </a>
          <template v-if="store.state.user?.role === 'admin'">
            <a href="/products/add" @click.prevent="$router.push('/products/add')">添加产品</a>
            <a href="/orders" @click.prevent="$router.push('/orders')">订单管理</a>
            <a href="/users" @click.prevent="$router.push('/users')">用户管理</a>
          </template>
          <a href="/profile" @click.prevent="$router.push('/profile')">个人中心</a>
          <button class="logout-btn" @click="handleLogout">退出登录</button>
        </nav>
        <nav class="nav" v-else>
          <router-link to="/login">登录</router-link>
          <router-link to="/register">注册</router-link>
        </nav>
      </div>
    </header>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from './store'

const router = useRouter()
const store = useStore()

const cartCount = computed(() => {
  return store.state.cart.reduce((sum, item) => sum + item.quantity, 0)
})

const handleLogout = () => {
  store.mutations.logout()
  router.push('/login')
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #2d5a27 0%, #4a7c23 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
}

.logo span:first-child {
  font-size: 1.5rem;
}

.nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.cart-link {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff6b6b;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;
}
</style>