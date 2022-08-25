// 产品管理

import Layout from '@/layout'

const MerchantInfoRouter = {
  path: '/MerchantInfo',
  component: Layout,
  redirect: 'noRedirect',
  name: 'MerchantInfo',
  meta: {
    title: '商户信息管理',
    icon: 'chart'
  },
  children: [
    {
      path: 'MerchantList',
      component: () => import('@/views/MerchantInfo/MerchantList/MerchantList'),
      name: 'MerchantList',
      meta: { title: '商户信息', noCache: true }
    },
    {
      path: 'MerchantOrder',
      component: () => import('@/views/MerchantInfo/MerchantOrder/MerchantOrder'),
      name: 'MerchantOrder',
      meta: { title: '商户订单', noCache: true }
    },
  ]
}

export default MerchantInfoRouter
