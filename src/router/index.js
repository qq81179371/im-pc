import { createRouter, createWebHistory } from 'vue-router'
// import layout from '@/views/layout/index.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/layout/index.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/chat/index.vue'),
          meta: {
            title: '智能客服服务系统'
          }
        }
      ]
    },
    {
      path: '/login',
      redirect: '/login/index',
      component: () => import('@/views/login/index.vue'),
      children: [
        {
          path: 'index',
          name: 'login',
          component: () => import('@/views/login/login.vue'),
          meta: {
            title: '登录'
          }
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/login/register.vue'),
          meta: {
            title: '注册'
          }
        }
      ]
    }
    /*
     * {
     *   path: '/status',
     *   name: 'status',
     *   component: () => import('@/views/status/index.vue'),
     *   meta: {
     *     title: '编辑状态'
     *   }
     * },
     * {
     *   path: '/user_info',
     *   name: 'userInfo',
     *   component: () => import('@/views/userInfo/index.vue'),
     *   meta: {
     *     title: '用户资料'
     *   }
     * },
     * {
     *   path: '/history_qa',
     *   name: 'historyQa',
     *   component: () => import('@/views/historyQa/index.vue'),
     *   meta: {
     *     title: '用户资料'
     *   }
     * },
     * {
     *   path: '/session_transfer',
     *   name: 'sessionTransfer',
     *   component: () => import('@/views/sessionTransfer/index.vue'),
     *   meta: {
     *     title: '会话转接'
     *   }
     * },
     * {
     *   path: '/session_over',
     *   name: 'sessionOver',
     *   component: () => import('@/views/sessionOver/index.vue'),
     *   meta: {
     *     title: '结束会话'
     *   }
     * },
     * {
     *   path: '/session_over/type',
     *   name: 'sessionOverType',
     *   component: () => import('@/views/sessionOver/type.vue'),
     *   meta: {
     *     title: '结束会话'
     *   }
     * },
     * {
     *   path: '/chatroom',
     *   name: 'chatroom',
     *   component: () => import('@/views/chatroom/index.vue'),
     *   meta: {
     *     title: '正在聊天'
     *   }
     * }
     */
  ]
})

export default router
