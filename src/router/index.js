import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '../views/login/index.vue'
import home from '../views/home/index.vue'
import welcome from '../views/welcome/index.vue'
import NotFound from '../views/404/index.vue'
import local from '@/utils/local'
import article from '../views/article/index'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    component: login
  }, {
    path: '/',
    component: home,
    children: [{
      path: '/',
      component: welcome
    }, {
      path: '/article',
      component: article
    } ]
  },
  {
    path: '*',
    component: NotFound
  }
  ]
})
// 路由导航守卫（前置导航守卫）
router.beforeEach((to, from, next) => {
  // to 跳转目标路由对象
  // from 从哪里跳过来的路由对象
  // next() 放行  next('/login') 拦截到登录
  // next()
  // 如果你访问的不是登录页面，且又没有登录，跳转到登录页面。
  const user = local.getUser()
  if (to.path !== '/login' && !user) return next('/login')
  next()
})

export default router
