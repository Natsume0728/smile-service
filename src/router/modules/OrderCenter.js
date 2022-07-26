// 订单中心

import Layout from '@/layout'

const OrderCenterRouter = {
  path: '/OrderCenter',
  component: Layout,
  redirect: 'noRedirect',
  name: 'OrderCenter',
  meta: {
    title: '订单中心',
    icon: 'chart'
  },
  children: [
    {
      path: 'OrderManage',
      component: () => import('@/views/OrderCenter/OrderManage/OrderManage'),
      name: 'BaseProductManage',
      meta: { title: '基础产品管理', noCache: true }
    },
    {
      path: 'VerificationOrderManage',
      component: () => import('@/views/OrderCenter/VerificationOrderManage/VerificationOrderManage'),
      name: 'BaseProductManage',
      meta: { title: '销售产品管理', noCache: true }
    }
  ]
}

export default OrderCenterRouter
