import { reactive } from 'vue'

const state = reactive({
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  cart: JSON.parse(localStorage.getItem('cart') || '[]')
})

const mutations = {
  setToken(token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  setUser(user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
  logout() {
    state.token = ''
    state.user = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  addToCart(product) {
    const existing = state.cart.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      state.cart.push({ ...product, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId)
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  updateCartQuantity(productId, quantity) {
    const item = state.cart.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId)
      } else {
        item.quantity = quantity
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    }
  },
  clearCart() {
    state.cart = []
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }
}

export function useStore() {
  return {
    state,
    mutations
  }
}