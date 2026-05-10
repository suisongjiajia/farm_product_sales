<template>
  <div class="users-page">
    <h1>用户管理</h1>
    <div class="users-table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th>用户名</th>
            <th>邮箱</th>
            <th>角色</th>
            <th>手机号</th>
            <th>地址</th>
            <th>注册时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="'role-badge role-' + user.role">
                {{ user.role === 'admin' ? '管理员' : '普通用户' }}
              </span>
            </td>
            <td>{{ user.phone || '-' }}</td>
            <td class="address-cell">{{ user.address || '-' }}</td>
            <td>{{ formatDate(user.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
    users.value = response.data
  } catch (error) {
    console.error('获取用户失败:', error)
  }
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleString('zh-CN')
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.users-page {
  padding: 1rem 0;
}

.users-page h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 2rem;
}

.users-table-container {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.users-table th,
.users-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.users-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #555;
}

.users-table tr:hover {
  background: #f8f9fa;
}

.role-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.role-admin {
  background: #fff3cd;
  color: #856404;
}

.role-customer {
  background: #d4edda;
  color: #155724;
}

.address-cell {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>