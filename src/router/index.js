import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import editPorject from '../page/editProject'
import addContract from '../page/addContract'
import editContract from '../page/editContract'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/editProject',
      name: 'editProject',
      component: editPorject
    }, {
      path: '/addContract',
      name: 'addContract',
      component: addContract
    }, {
      path: '/editContract',
      name: 'editContract',
      component: editContract
    }
  ]
})

export default router
