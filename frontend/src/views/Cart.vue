<template>
  <div class="cart-page">
    <h1>购物车</h1>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>购物车是空的</p>
      <button class="continue-shopping" @click="$router.push('/products')">去购物</button>
    </div>
    <div v-else class="cart-container">
      <div class="cart-items">
        <div class="cart-item" v-for="item in cartItems" :key="item.id">
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p class="price">¥{{ item.price.toFixed(2) }}</p>
          </div>
          <div class="item-quantity">
            <button class="qty-btn" @click="handleDecrease(item.id)">-</button>
            <span>{{ item.quantity }}</span>
            <button class="qty-btn" @click="handleIncrease(item.id)">+</button>
          </div>
          <div class="item-total">
            ¥{{ (item.price * item.quantity).toFixed(2) }}
          </div>
          <button class="remove-btn" @click="handleRemove(item.id)">删除</button>
        </div>
      </div>
      <div class="cart-summary">
        <div class="summary-row">
          <span>商品总数:</span>
          <span>{{ totalQuantity }}</span>
        </div>
        <div class="summary-row total">
          <span>合计:</span>
          <span>¥{{ totalAmount.toFixed(2) }}</span>
        </div>
        <input 
          type="text" 
          v-model="shippingAddress" 
          placeholder="请输入收货地址"
          class="address-input"
        />
        <button class="checkout-btn" @click="handleCheckout">结算</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useStore } from '../store'
import { ElMessage } from 'element-plus'

const store = useStore()
const shippingAddress = ref('')

const cartItems = computed(() => store.state.cart)

const totalQuantity = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

const totalAmount = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const handleIncrease = (productId) => {
  const item = cartItems.value.find(item => item.id === productId)
  if (item && item.quantity < item.stock) {
    store.mutations.updateCartQuantity(productId, item.quantity + 1)
  } else if (item && item.quantity >= item.stock) {
    ElMessage.warning('库存不足')
  }
}

const handleDecrease = (productId) => {
  store.mutations.updateCartQuantity(productId, cartItems.value.find(item => item.id === productId).quantity - 1)
}

const handleRemove = (productId) => {
  store.mutations.removeFromCart(productId)
}

const handleCheckout = async () => {
  if (!shippingAddress.value.trim()) {
    ElMessage.warning('请输入收货地址')
    return
  }
  
  try {
    const token = localStorage.getItem('token')
    const products = cartItems.value.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }))
    
    await axios.post('/api/orders', { products, shippingAddress: shippingAddress.value }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    store.mutations.clearCart()
    shippingAddress.value = ''
    ElMessage.success('订单提交成功')
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '下单失败')
  }
}
</script>

<style scoped>
.cart-page {
  padding: 1rem 0;
}

.cart-page h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 2rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.continue-shopping {
  background: #4a7c23;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.continue-shopping:hover {
  background: #3d6b1f;
}

.cart-container {
  display: flex;
  gap: 2rem;
}

.cart-items {
  flex: 2;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 1rem;
}

.item-info h3 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.3rem;
}

.item-info .price {
  font-size: 1rem;
  color: #4a7c23;
  font-weight: 500;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.qty-btn {
  width: 32px;
  height: 32px;
  background: #eee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.qty-btn:hover {
  background: #ddd;
}

.item-quantity span {
  min-width: 32px;
  text-align: center;
  font-weight: 500;
}

.item-total {
  font-size: 1.2rem;
  color: #4a7c23;
  font-weight: bold;
  min-width: 100px;
  text-align: right;
}

.remove-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.remove-btn:hover {
  background: #c0392b;
}

.cart-summary {
  flex: 1;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
}

.summary-row.total {
  font-size: 1.3rem;
  font-weight: bold;
  color: #4a7c23;
  border-bottom: none;
  margin-top: 0.5rem;
}

.address-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin: 1rem 0;
}

.checkout-btn {
  width: 100%;
  background: linear-gradient(135deg, #2d5a27 0%, #4a7c23 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s;
}

.checkout-btn:hover {
  transform: translateY(-2px);
}
</style>