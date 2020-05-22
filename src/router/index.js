import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/login',
        component: () => import('../components/login.vue')
      },
      {
        path: '/register',
        component: () => import('../components/register.vue')
      },
      {
        path: '/home',
        component: () => import('../components/home.vue')
      },
      {
        path: '/project',
        component: () => import('../components/project.vue')
      },
      {
        path: '/list',
        component: () => import('../components/list.vue')
      },
      {
        path: '/detail/:id(\\d+)?',
        component: () => import('../components/detail.vue')
      }
    ]
  })

