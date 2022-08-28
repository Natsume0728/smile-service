// 产品管理

import Layout from '@/layout'

const MerchantInfoRouter = {
  path: '/MerchantInfo',
  component: Layout,
  redirect: 'noRedirect',
  name: 'MerchantInfo',
  meta: {
    title: '商户管理',
    icon: 'chart'
  },
  children: [
    {
      path: 'MerchantList',
      component: () => import('@/views/MerchantInfo/MerchantList/MerchantList'),
      name: 'MerchantList',
      meta: { title: '商户列表', noCache: true }
    },
    {
      path: 'MerchantOrder',
      component: () => import('@/views/MerchantInfo/MerchantOrder/MerchantOrder'),
      name: 'MerchantOrder',
      meta: { title: '商户订单列表', noCache: true },
    },
    {
      path: 'MerchantOrderGoodslist',
      component: () => import('@/views/MerchantInfo/MerchantOrder/MerchantOrderGoodslist/MerchantOrderGoodslist'),
      name: 'MerchantOrderGoodslist',
      meta: { title: '商户订单商品列表', noCache: true },
    },
    {
      path: 'MerchantOrderCustomList',
      component: () => import('@/views/MerchantInfo/MerchantOrder/MerchantOrderCustomList/MerchantOrderCustomList'),
      name: 'MerchantOrderCustomList',
      meta: { title: '商户订单消费者列表', noCache: true },
    },
  ]
}

export default MerchantInfoRouter
