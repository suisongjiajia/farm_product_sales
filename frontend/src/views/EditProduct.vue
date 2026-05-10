<template>
  <div class="edit-product-page">
    <h1>编辑产品</h1>
    <form class="product-form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label>产品名称 *</label>
          <input 
            type="text" 
            v-model="form.name" 
            placeholder="请输入产品名称"
            required
          />
        </div>
        <div class="form-group">
          <label>分类 *</label>
          <input 
            type="text" 
            v-model="form.category" 
            placeholder="请输入分类"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>价格 *</label>
          <input 
            type="number" 
            v-model="form.price" 
            placeholder="请输入价格"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div class="form-group">
          <label>库存 *</label>
          <input 
            type="number" 
            v-model="form.stock" 
            placeholder="请输入库存数量"
            required
            min="0"
          />
        </div>
      </div>
      <div class="form-group">
        <label>产品图片URL</label>
        <input 
          type="text" 
          v-model="form.image" 
          placeholder="请输入图片URL"
        />
      </div>
      <div class="form-group">
        <label>产品描述</label>
        <textarea 
          v-model="form.description" 
          placeholder="请输入产品描述"
          rows="4"
        ></textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="submit-btn">保存</button>
        <button type="button" class="cancel-btn" @click="$router.push('/products')">取消</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

const form = ref({
  name: '',
  category: '',
  price: '',
  stock: '',
  image: '',
  description: ''
})

const fetchProduct = async () => {
  try {
    const response = await axios.get(`/api/products/${route.params.id}`)
    const product = response.data
    form.value = {
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
      description: product.description
    }
  } catch (error) {
    ElMessage.error('获取产品信息失败')
    router.push('/products')
  }
}

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`/api/products/${route.params.id}`, form.value, {
      headers: { Authorization: `Bearer ${token}` }
    })
    ElMessage.success('产品更新成功')
    router.push('/products')
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '更新失败')
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<style scoped>
.edit-product-page {
  max-width: 600px;
  margin: 0 auto;
}

.edit-product-page h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 2rem;
}

.product-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #555;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4a7c23;
}

.form-group textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.submit-btn {
  flex: 1;
  background: linear-gradient(135deg, #2d5a27 0%, #4a7c23 100%);
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.3s;
}

.submit-btn:hover {
  transform: translateY(-2px);
}

.cancel-btn {
  background: #ddd;
  color: #333;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.cancel-btn:hover {
  background: #ccc;
}
</style>