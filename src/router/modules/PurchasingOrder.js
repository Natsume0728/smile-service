// 产品管理

import Layout from '@/layout'

const PurchasingOrderRouter = {
  path: '/PurchasingOrder',
  component: Layout,
  redirect: 'noRedirect',
  name: 'PurchasingOrder',
  meta: {
    title: '采购单信息',
    icon: 'chart'
  },
  children: [
    {
      path: 'PurchasingOrderList',
      component: () => import('@/views/PurchasingOrder/PurchasingOrderList/PurchasingOrderList'),
      name: 'PurchasingOrderList',
      meta: { title: '采购单列表', noCache: true }
    },
    {
      path: 'PurchasingOrderAdd',
      component: () => import('@/views/PurchasingOrder/PurchasingOrderAdd/PurchasingOrderAdd'),
      name: 'PurchasingOrderAdd',
      meta: { title: '采购单新增', noCache: true }
    },
  ]
}

export default PurchasingOrderRouter