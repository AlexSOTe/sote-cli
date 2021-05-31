import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/Home',
    component: () => import('../views/Home.vue'),
    name: '首页',
  },
  {
    path: '/404',
    component: () => import('../views/NotFound.vue'),
    name: 'Not Found',
  },
  {
    path: '*',
    redirect: {
      path: '/404'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.scrollToTop) {
    let scrollEle = document.querySelector('.content-container') || { scrollTop: 0 }
    scrollEle.scrollTop = 0;
  }
  next()
})

export default router
