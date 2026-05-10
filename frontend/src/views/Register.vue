<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-header">
        <span class="logo">🌾</span>
        <h2>注册</h2>
      </div>
      <form class="register-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <label>用户名</label>
          <input 
            type="text" 
            v-model="form.username" 
            placeholder="请输入用户名"
            required
          />
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input 
            type="email" 
            v-model="form.email" 
            placeholder="请输入邮箱"
            required
          />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input 
            type="password" 
            v-model="form.password" 
            placeholder="请输入密码（至少6位）"
            required
            minlength="6"
          />
        </div>
        <div class="form-group">
          <label>手机号</label>
          <input 
            type="tel" 
            v-model="form.phone" 
            placeholder="请输入手机号"
          />
        </div>
        <div class="form-group">
          <label>地址</label>
          <input 
            type="text" 
            v-model="form.address" 
            placeholder="请输入地址"
          />
        </div>
        <button type="submit" class="register-btn">注册</button>
      </form>
      <p class="login-link">
        已有账号？<a href="/login">立即登录</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const form = ref({
  username: '',
  email: '',
  password: '',
  phone: '',
  address: ''
})

const handleRegister = async () => {
  try {
    await axios.post('/api/users/register', form.value)
    ElMessage.success('注册成功')
    router.push('/login')
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '注册失败')
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

.register-container {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  font-size: 3rem;
  display: block;
  margin-bottom: 0.5rem;
}

.register-header h2 {
  font-size: 1.5rem;
  color: #333;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #555;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #4a7c23;
}

.register-btn {
  background: linear-gradient(135deg, #2d5a27 0%, #4a7c23 100%);
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s;
  margin-top: 0.5rem;
}

.register-btn:hover {
  transform: translateY(-2px);
}

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.login-link a {
  color: #4a7c23;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>