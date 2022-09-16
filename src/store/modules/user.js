import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import md5 from 'md5'
import request from '@/utils/request'

const state = {
  permissionList: [],
  token: getToken(),
  name: '',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  roles: ['admin'],
  manageCommonEnumDictAll: {},
}

const mutations = {
  SET_permissionList: (state, permissionList) => {
    state.permissionList = permissionList
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },

  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },

  SET_manageCommonEnumDictAll: (state, manageCommonEnumDictAll) => {
    state.manageCommonEnumDictAll = manageCommonEnumDictAll
  },

}

const enumDictAll = async(commit) => {
  const { data } = await request({
    method: 'GET',
    url: '/manage-api/manage/common/enumDictAll',
  })
  commit('SET_manageCommonEnumDictAll', data)
}

const actions = {
  // user login
  async login({ commit }, { username, password }) {
    const { code, token, data } = await request({
      url: '/auth-api/auth/pwd/login',
      method: 'post',
      headers: { 'content-Type': 'application/json' },
      data: { username: username.trim(), password: md5(password) }
    })
    if (code !== '0000') return
    const permissionList = data.permissionList.map(el => el.permPath)
    commit('SET_permissionList', permissionList)
    commit('SET_TOKEN', token)
    enumDictAll(commit)
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve) => {
      const data = {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      }
      const { name, avatar } = data
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      resolve(data)
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_permissionList', [])
      commit('permission/SET_hasGenerateRoutes', false, { root: true })
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
