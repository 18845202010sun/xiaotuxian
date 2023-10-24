import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('@/components/XtxLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/views/home/HomePage.vue')
      },
      {
        path: "category/:id",
        component: () => import("@/views/category/TopCategoryPage.vue")
      },
      {
        path: "category/sub/:top/:sub",
        component: () => import("@/views/category/SubCategoryPage.vue")
      },
      {
        path: "goods/:id",
        component: () => import("@/views/goods/GoodsDetailPage.vue"),
      },
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes
})

export default router
