import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '../views/login/index.vue'
import home from '../views/home/index.vue'
import welcome from '../views/welcome/index.vue'
import NotFound from '../views/404/index.vue'

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
    }]
  },
  {
    path: '*',
    component: NotFound
  }
  ]
})

export default router
