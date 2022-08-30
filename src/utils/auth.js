// import Cookies from 'js-cookie'
import store from '@/store'
// const TokenKey = 'Admin-Token'

export function getToken() {
  // return Cookies.get(TokenKey)
  return store?.getters?.token
}

export function setToken(token) {
  return store?.commit('user/SET_TOKEN', token)
  // return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return store?.commit('user/SET_TOKEN', null)
  // return Cookies.remove(TokenKey)
}
