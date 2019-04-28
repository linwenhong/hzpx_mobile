import Vue from 'vue'
import Router from 'vue-router'
import { COMPONENTS } from './components'
import Cache from '@/assets/cache'

Vue.use(Router)

const routes = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/login',
      component: COMPONENTS.Login
    }, // 绑定
    {
      path: '/user-choice',
      component: COMPONENTS.UserChoice
    }, // 身份选择
    {
      path: '/home', component: COMPONENTS.Home, redirect: '/home/notice', children: [
        {
          path: 'notice',
          component: COMPONENTS.Notice
        }, // 通知
        {
          path: 'exercises',
          component: COMPONENTS.Exercises
        }, // 练题
        {
          path: 'personal',
          component: COMPONENTS.Personal
        } // 个人中心
      ]
    },
    {
      path: '/unitChange',
      component: COMPONENTS.UnitChange
      // 单位变更
    },
    {
      path: '/myInfo',
      component: COMPONENTS.MyInfo
      // 个人信息
    },
    {
      path: '/cert',
      component: COMPONENTS.Cert
      // 合格证
    },
    {
      path: '/certificate',
      component: COMPONENTS.Certificate
      // 合格证
    },
    {
      path: '/unitForm', component: COMPONENTS.UnitForm
      // 新增单位变更列表
    },
    {
      path: '/question',
      component: COMPONENTS.Question
    },
    {
      path: '/sign-in',
      component: COMPONENTS.SignIn
    },
    {
      path: '/auth',
      component: COMPONENTS.Auth
    },
    {
      path: '/handle',
      component: COMPONENTS.Handle
    },
  ]
});

routes.beforeEach((to, from, next) => {
  if (
    to.path == '/auth'
    || to.path == '/handle'
    || to.path == '/sign-in'
  ) {
    next()
  } else if (to.path != '/login') {
    if (!Cache.getCache('login') || !Cache.getCache('info')) {
      next('/login')
    }
  } else {
    if (Cache.getCache('login') && Cache.getCache('info')) {
      next('/home/personal')
    }
  }
  next()
});

export default routes