<template>
  <div class="products-page">
    <div class="page-header">
      <h1>产品列表</h1>
      <div class="search-bar">
        <input 
          type="text" 
          v-model="searchKeyword" 
          placeholder="搜索产品..."
          @input="handleSearch"
        />
        <select v-model="selectedCategory" @change="handleSearch">
          <option value="">全部分类</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>
    
    <div class="products-grid">
      <div class="product-card" v-for="product in filteredProducts" :key="product.id">
        <div class="product-image">
            <img :src="product.image || `https://picsum.photos/seed/${product.id}/200/200`" :alt="product.name" />
          </div>
        <h3>{{ product.name }}</h3>
        <p class="product-category">{{ product.category }}</p>
        <p class="product-price">¥{{ product.price.toFixed(2) }}</p>
        <p class="product-desc">{{ product.description }}</p>
        <p class="product-stock">库存: {{ product.stock }}</p>
        <div class="product-actions">
          <button 
            class="add-cart-btn" 
            @click="handleAddToCart(product)"
            :disabled="product.stock === 0"
          >
            {{ product.stock === 0 ? '已售罄' : '加入购物车' }}
          </button>
          <button 
            v-if="isAdmin" 
            class="edit-btn" 
            @click="$router.push(`/products/edit/${product.id}`)"
          >
            编辑
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useStore } from '../store'
import { ElMessage } from 'element-plus'

const products = ref([])
const searchKeyword = ref('')
const selectedCategory = ref('')
const categories = ref([])
const store = useStore()

const isAdmin = computed(() => store.state.user?.role === 'admin')

const filteredProducts = computed(() => {
  return products.value.map(p => ({
    ...p,
    price: parseFloat(p.price) || 0
  })).filter(product => {
    const matchKeyword = !searchKeyword.value || 
      product.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchKeyword.value.toLowerCase())
    const matchCategory = !selectedCategory.value || product.category === selectedCategory.value
    return matchKeyword && matchCategory
  })
})

const fetchProducts = async () => {
  try {
    const response = await axios.get('/api/products')
    products.value = response.data
    categories.value = [...new Set(response.data.map(p => p.category))]
  } catch (error) {
    console.error('获取产品失败:', error)
  }
}

const handleSearch = () => {}

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
.products-page {
  padding: 1rem 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-header h1 {
  font-size: 1.8rem;
  color: #333;
}

.search-bar {
  display: flex;
  gap: 0.5rem;
}

.search-bar input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  min-width: 200px;
}

.search-bar select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
  height: 200px;
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

.product-desc {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-stock {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
}

.product-actions {
  display: flex;
  gap: 0.5rem;
}

.add-cart-btn {
  flex: 1;
  background: #4a7c23;
  color: white;
  border: none;
  padding: 0.6rem;
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

.edit-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.edit-btn:hover {
  background: #2980b9;
}
</style>