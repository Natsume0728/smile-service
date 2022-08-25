// 产品管理

import Layout from '@/layout'

const ProductManageRouter = {
  path: '/ProductManage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ProductManage',
  meta: {
    title: '产品管理',
    icon: 'chart'
  },
  children: [
    {
      path: 'BaseProductManage',
      component: () => import('@/views/ProductManage/BaseProductManage/BaseProductManage'),
      name: 'BaseProductManage',
      meta: { title: '基础产品管理', noCache: true }
    },
    {
      path: 'SalesProductManage',
      component: () => import('@/views/ProductManage/SalesProductManage/SalesProductManage'),
      name: 'SalesProductManage',
      meta: { title: '销售产品管理', noCache: true }
    }
  ]
}

export default ProductManageRouter
