import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import Log from '../views/Log.vue'
import Monitor from '../views/Monitor.vue'
import Role from '../views/Role.vue'
import Pwd from '../views/Pwd.vue'
import Dic from '../views/Dic.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/users',
    children: [
      { path: '/users', component: Users },
      { path: '/log', component: Log },
      { path: '/monitor', component: Monitor },
      { path: '/role', component: Role },
      { path: '/pwd', component: Pwd },
      { path: '/dic', component: Dic }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
