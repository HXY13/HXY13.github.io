/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const nestedRouter = {
  path: '/nested',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Nested',
  meta: {
    title: 'TOP',
    icon: 'nested'
  },
  children: [
    {
      path: 'hxy1',
      component: () => import('@/views/nested/hxy1'), // Parent router-view
      name: 'Menu1',
      meta: { title: '浏览量TOP10' },
    },
    {
      path: 'hxy2',
      component: () => import('@/views/nested/hxy2'), // Parent router-view
      name: 'Menu1',
      meta: { title: '讨论量TOP10' },
    },
    {
      path: 'hxy3',
      component: () => import('@/views/nested/hxy3'), // Parent router-view
      name: 'Menu1',
      meta: { title: '浏览量vs讨论量' },
    },
    {
      path: 'hxy4',
      name: 'Menu2',
      component: () => import('@/views/nested/hxy4'),
      meta: { title: '演讲主题词云图' }
    }
  ]
}

export default nestedRouter
