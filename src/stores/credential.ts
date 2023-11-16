import { acceptHMRUpdate, defineStore } from 'pinia'
import http from '~/utils/axios'
import type { ICredentialData, ICredentialUpdate, IEnter } from '~/types'

interface IState {
  credential: ICredentialData
  user: IEnter
  message: string
}

const useCredentialStore = defineStore('credential', {
  state: (): IState => ({
    credential: {
      app_id: 0,
      login: '',
      password: '',
    },
    user: {
      id: 0,
      username: '',
      password: '',
      urlFrontend: '',
    },
    message: '',
  }),
  actions: {
    async fetchCredential(app_id: number | undefined) {
      try {
        const response = await http.get(`/apps/${app_id}/credential`)
        this.credential = response.data
        this.user.id = response.data.app_id
        this.user.username = response.data.login
        this.user.password = response.data.password
      }
      catch (e: any) {
        this.credential.login = this.credential.password = ''
        this.message = e.response.data.message
        return Promise.reject(e)
      }
    },
    async createCredential(credential: Partial<ICredentialData> & Pick<ICredentialData, 'app_id'>) {
      try {
        await http.post(`/apps/${credential.app_id}/credential`, credential)
        await this.fetchCredential(credential.app_id)
      }
      catch (e: any) {
        this.message = e.response.data.message
        return Promise.reject(e)
      }
    },
    async updateCredential(credentialUpdate: Partial<ICredentialUpdate> & Pick<ICredentialUpdate, 'app_id'>) {
      try {
        await http.put(`/apps/${credentialUpdate.app_id}/credential`, credentialUpdate)
        await this.fetchCredential(credentialUpdate.app_id)
      }
      catch (e: any) {
        this.message = e.response.data.message
        return Promise.reject(e)
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCredentialStore as any, import.meta.hot))

export default useCredentialStore
