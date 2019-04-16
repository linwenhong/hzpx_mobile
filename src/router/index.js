import Vue from 'vue'
import Router from 'vue-router'
import { COMPONENTS } from './components'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/question',
      component: COMPONENTS.Question
    },
    {
      path: '/question2',
      component: COMPONENTS.Question,
      children: [

      ]
    }
  ]
})
