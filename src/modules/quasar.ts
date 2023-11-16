import { Dialog, Notify, Quasar } from 'quasar'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(Quasar, {
    plugins: { Dialog, Notify },
    config: {
      notify: {
        position: 'top-right',
      },
    },
  })
}
