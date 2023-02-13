// import NProgress from 'nprogress' // progress bar
import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import 'nprogress/nprogress.css' // progress bar style
// import jsCookie from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'forgetPassword'] // no redirect whitelist
// console.log(this)
router.beforeEach((to, from, next) => {
  // start progress bar
  // NProgress.start()
  // set page title
  document.title = to.meta.title
  // determine whether the user has logged i
  const hasToken = localStorage.getItem('token')
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      // NProgress.done()
    } else {
      next()
      // NProgress.done()
    }
  } else if (whiteList.indexOf(to.name) !== -1) {
    // in the free login whitelist, go directly
    next()
  } else {
    // other pages that do not have permission to access are redirected to the login page.
    next('/login')
    // NProgress.done()
  }
})

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
