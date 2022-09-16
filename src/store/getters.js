const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  permissionList: state => state.user.permissionList,
  avatar: state => state.user.avatar,
  manageCommonEnumDictAll: state => state.user.manageCommonEnumDictAll,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  hasGenerateRoutes: state => state.permission.hasGenerateRoutes,
  errorLogs: state => state.errorLog.logs
}
export default getters
