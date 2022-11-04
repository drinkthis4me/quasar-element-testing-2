
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/gallery', component: () => import('pages/GalleryPage.vue') },
      { path: '/table', component: () => import('pages/TablePage.vue') },
      { path: '/comment', component: () => import('pages/CommentPage.vue') },
      { path: '/dessert', component: () => import('pages/DessertPage.vue') },
      { path: '/comment', component: () => import('pages/CommentPage.vue') },
      { path: '/timer', component: () => import('pages/TimerPage.vue') },
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
