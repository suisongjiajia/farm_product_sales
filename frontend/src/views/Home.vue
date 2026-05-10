<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="hero-content">
        <h1>🌾 新鲜农产品，直达您的餐桌</h1>
        <p>精选优质农产品，源自田间地头，品质保证</p>
        <button class="hero-btn" @click="$router.push('/products')">
          立即选购
        </button>
      </div>
    </div>
    
    <div class="products-section">
      <h2>热门产品</h2>
      <div class="products-grid">
        <div class="product-card" v-for="product in products" :key="product.id">
          <div class="product-image">
            <img :src="product.image || `https://picsum.photos/seed/${product.id}/200/180`" :alt="product.name" />
          </div>
          <h3>{{ product.name }}</h3>
          <p class="product-category">{{ product.category }}</p>
          <p class="product-price">¥{{ product.price.toFixed(2) }}</p>
          <p class="product-stock">库存: {{ product.stock }}</p>
          <button 
            class="add-cart-btn" 
            @click="handleAddToCart(product)"
            :disabled="product.stock === 0"
          >
            {{ product.stock === 0 ? '已售罄' : '加入购物车' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useStore } from '../store'
import { ElMessage } from 'element-plus'

const products = ref([])
const store = useStore()

const fetchProducts = async () => {
  try {
    const response = await axios.get('/api/products')
    products.value = response.data.slice(0, 6).map(p => ({
      ...p,
      price: parseFloat(p.price) || 0
    }))
  } catch (error) {
    console.error('获取产品失败:', error)
  }
}

const handleAddToCart = (product) => {
  if (!store.state.user) {
    ElMessage.warning('请先登录')
    return
  }
  store.mutations.addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock
  })
  ElMessage.success('已添加到购物车')
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.home-page {
  padding: 2rem 0;
}

.hero-section {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  padding: 4rem 2rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 3rem;
}

.hero-content h1 {
  font-size: 2.5rem;
  color: #2d5a27;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
}

.hero-btn {
  background: linear-gradient(135deg, #2d5a27 0%, #4a7c23 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s;
}

.hero-btn:hover {
  transform: scale(1.05);
}

.products-section h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.product-category {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.4rem;
  color: #2d5a27;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.product-stock {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
}

.add-cart-btn {
  width: 100%;
  background: #4a7c23;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.add-cart-btn:hover:not(:disabled) {
  background: #3d6b1f;
}

.add-cart-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>