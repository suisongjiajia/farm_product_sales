<template>
  <div class="profile-page">
    <h1>个人中心</h1>
    <div class="profile-container">
      <div class="profile-info">
        <div class="info-item">
          <label>用户名</label>
          <span>{{ user?.username }}</span>
        </div>
        <div class="info-item">
          <label>邮箱</label>
          <span>{{ user?.email }}</span>
        </div>
        <div class="info-item">
          <label>角色</label>
          <span>{{ user?.role === 'admin' ? '管理员' : '普通用户' }}</span>
        </div>
        <div class="info-item">
          <label>手机号</label>
          <span>{{ user?.phone || '-' }}</span>
        </div>
        <div class="info-item">
          <label>地址</label>
          <span>{{ user?.address || '-' }}</span>
        </div>
      </div>
      <div class="profile-actions">
        <button class="action-btn edit-btn" @click="showEditForm = true">编辑信息</button>
        <button class="action-btn orders-btn" @click="$router.push('/orders')">查看订单</button>
      </div>
    </div>

    <div v-if="showEditForm" class="edit-modal">
      <div class="modal-content">
        <h2>编辑个人信息</h2>
        <form @submit.prevent="handleUpdate">
          <div class="form-group">
            <label>用户名</label>
            <input type="text" v-model="form.username" />
          </div>
          <div class="form-group">
            <label>邮箱</label>
            <input type="email" v-model="form.email" />
          </div>
          <div class="form-group">
            <label>手机号</label>
            <input type="tel" v-model="form.phone" />
          </div>
          <div class="form-group">
            <label>地址</label>
            <input type="text" v-model="form.address" />
          </div>
          <div class="form-actions">
            <button type="submit" class="submit-btn">保存</button>
            <button type="button" class="cancel-btn" @click="showEditForm = false">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useStore } from '../store'
import { ElMessage } from 'element-plus'

const store = useStore()
const user = ref(null)
const showEditForm = ref(false)
const form = ref({
  username: '',
  email: '',
  phone: '',
  address: ''
})

const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    user.value = response.data
    form.value = {
      username: response.data.username,
      email: response.data.email,
      phone: response.data.phone || '',
      address: response.data.address || ''
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

const handleUpdate = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.put('/api/users/profile', form.value, {
      headers: { Authorization: `Bearer ${token}` }
    })
    user.value = response.data
    store.mutations.setUser(response.data)
    showEditForm.value = false
    ElMessage.success('信息更新成功')
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '更新失败')
  }
}

onMounted(() => {
  fetchUser()
})
</script>

<style scoped>
.profile-page {
  padding: 1rem 0;
}

.profile-page h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 2rem;
}

.profile-container {
  max-width: 600px;
}

.profile-info {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item label {
  font-weight: 500;
  color: #666;
}

.info-item span {
  color: #333;
}

.profile-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.edit-btn {
  background: #4a7c23;
  color: white;
}

.edit-btn:hover {
  background: #3d6b1f;
}

.orders-btn {
  background: #3498db;
  color: white;
}

.orders-btn:hover {
  background: #2980b9;
}

.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 450px;
}

.modal-content h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #555;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #4a7c23;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.submit-btn {
  flex: 1;
  background: #4a7c23;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 6px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #3d6b1f;
}

.cancel-btn {
  background: #ddd;
  color: #333;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
}

.cancel-btn:hover {
  background: #ccc;
}
</style>