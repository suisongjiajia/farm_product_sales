<template>
  <div class="add-product-page">
    <h1>添加产品</h1>
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
        <button type="submit" class="submit-btn">提交</button>
        <button type="button" class="cancel-btn" @click="$router.push('/products')">取消</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const form = ref({
  name: '',
  category: '',
  price: '',
  stock: '',
  image: '',
  description: ''
})

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token')
    await axios.post('/api/products', form.value, {
      headers: { Authorization: `Bearer ${token}` }
    })
    ElMessage.success('产品添加成功')
    router.push('/products')
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '添加失败')
  }
}
</script>

<style scoped>
.add-product-page {
  max-width: 600px;
  margin: 0 auto;
}

.add-product-page h1 {
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