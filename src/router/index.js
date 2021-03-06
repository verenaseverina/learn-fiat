import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = () => import( /* webpackChunkName: "home" */ '../pages/home.vue')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: home,
    },
  ],
})
