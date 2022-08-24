import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'https://dev.defenderfintech.com/smile-api/auth-api/auth/pwd/login',
    method: 'post',
    headers: {
      'content-Type': 'application/json'
    },
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
