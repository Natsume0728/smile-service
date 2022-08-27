// 产品管理

import Layout from '@/layout'

const GoodsManagerRouter = {
  path: '/GoodsManager',
  component: Layout,
  redirect: 'noRedirect',
  name: 'GoodsManager',
  meta: {
    title: '商品管理',
    icon: 'chart'
  },
  children: [
    {
      path: 'GoodsList',
      component: () => import('@/views/GoodsManager/GoodsList/GoodsList'),
      name: 'GoodsList',
      meta: { title: '商品列表', noCache: true }
    },
  ]
}

export default GoodsManagerRouter
