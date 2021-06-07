/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: '视频发布时间',
    icon: 'component'
  },
  children: [
    {
      path: 'markdown',
      component: () => import('@/views/components-demo/markdown'),
      name: '时间段分析',
      meta: { title: '按年分析' },
    },
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/tinymce'),
      name: '时间段分析',
      meta: { title: '按月分析' }
    },
    {
      path: 'zhou',
      component: () => import('@/views/components-demo/zhou'),
      name: '时间段分析',
      meta: { title: '按周分析' }
    }
  ]
}

export default componentsRouter
