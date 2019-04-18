import Vue from 'vue'
import Router from 'vue-router'
import { COMPONENTS } from './components'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    {path: '/home', component: COMPONENTS.Home, redirect: '/home/notice', children: [
      {
        path: 'login',
        component: COMPONENTS.Login
      },
      {
        path: 'notice',
        component: COMPONENTS.Notice
      },
      {
        path: 'exercises',
        component: COMPONENTS.Exercises
      },
      {
        path: 'personal',
        component: COMPONENTS.Personal
      }
    ]},
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
