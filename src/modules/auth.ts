import type { UserModule } from '~/types'

export const install: UserModule = ({ router }) => {
  router.beforeEach((to, from, next) => {
    if (to.meta.public) {
      // Public
      if (localStorage.getItem('token')) {
        // Auth
        next('/')
      }
      else {
        // No auth
        next()
      }
    }
    else {
      // Private
      if (localStorage.getItem('token')) {
        // Auth
        next()
      }
      else {
        // No Auth
        next('/login')
        // next()
      }
    }
  })
}
