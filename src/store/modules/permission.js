import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.permPath to determine if the current user has permission
 * @param permPath
 * @param route
 */
function hasPermission(route, permissionList) {
  if (!route.meta || !route.meta.permPath) return true
  return permissionList.includes(route.meta.permPath)
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, permissionList) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(tmp, permissionList)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissionList)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit, rootGetters }) {
    return new Promise(resolve => {
      const permissionList = rootGetters.permissionList
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, permissionList) || []
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
