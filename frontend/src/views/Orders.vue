<template>
  <div class="orders-page">
    <h1>订单管理</h1>
    <div class="orders-table-container">
      <table class="orders-table">
        <thead>
          <tr>
            <th>订单ID</th>
            <th>用户</th>
            <th>产品</th>
            <th>总金额</th>
            <th>状态</th>
            <th>地址</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ String(order.id).slice(-8) }}</td>
            <td>{{ order.userId?.username }}</td>
            <td>
              <div class="products-list">
                <span v-for="(item, index) in order.products" :key="index">
                  {{ item.productId?.name }} x{{ item.quantity }}
                  <span v-if="index < order.products.length - 1">, </span>
                </span>
              </div>
            </td>
            <td>¥{{ parseFloat(order.total_amount).toFixed(2) }}</td>
            <td>
              <span :class="'status-badge status-' + order.status">
                {{ statusText[order.status] }}
              </span>
            </td>
            <td class="address-cell">{{ order.shipping_address }}</td>
            <td>{{ formatDate(order.created_at) }}</td>
            <td>
              <select 
                :value="order.status" 
                @change="handleStatusChange(order.id, $event.target.value)"
              >
                <option v-for="(text, key) in statusText" :key="key" :value="key">
                  {{ text }}
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const orders = ref([])

const statusText = {
  pending: '待付款',
  paid: '已付款',
  shipped: '已发货',
  delivered: '已送达',
  cancelled: '已取消'
}

const fetchOrders = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
    orders.value = response.data
  } catch (error) {
    console.error('获取订单失败:', error)
  }
}

const handleStatusChange = async (orderId, status) => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`/api/orders/${orderId}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = status
    }
    ElMessage.success('状态更新成功')
  } catch (error) {
    ElMessage.error('更新失败')
  }
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleString('zh-CN')
}

onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
.orders-page {
  padding: 1rem 0;
}

.orders-page h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 2rem;
}

.orders-table-container {
  overflow-x: auto;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.orders-table th,
.orders-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.orders-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #555;
}

.orders-table tr:hover {
  background: #f8f9fa;
}

.products-list {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-paid {
  background: #d4edda;
  color: #155724;
}

.status-shipped {
  background: #cce5ff;
  color: #004085;
}

.status-delivered {
  background: #d4edda;
  color: #155724;
}

.status-cancelled {
  background: #f8d7da;
  color: #721c24;
}

.address-cell {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>