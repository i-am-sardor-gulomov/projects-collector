import { acceptHMRUpdate, defineStore } from 'pinia'
import http from '~/utils/axios'
import type { IApp, IAppData } from '~/types'

interface IState {
  apps: IAppData[]
}

const useAppStore = defineStore('app', {
  state: (): IState => ({
    apps: [],
  }),
  actions: {
    // Read
    async fetchApps() {
      try {
        const response = await http.get('/apps?_page=1&_sort=id&_order=desc')
        this.apps = response.data.data
      }
      catch (e) {
        return Promise.reject(e)
      }
    },
    // Create
    async createApp(app: Omit<IApp, 'id'>) {
      try {
        await http.post('/apps', app)
        await this.fetchApps()
      }
      catch (e) {
        return Promise.reject(e)
      }
    },
    // Update
    async updateApp(app: Partial<IApp> & Pick<IApp, 'id'>) {
      try {
        await http.put(`/apps/${app.id}`, app)
        await this.fetchApps()
      }
      catch (e) {
        return Promise.reject(e)
      }
    },
    // Delete
    async deleteApp(id: number) {
      try {
        await http.delete(`/apps/${id}`)
        await this.fetchApps()
      }
      catch (e) {
        return Promise.reject(e)
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot?.accept(acceptHMRUpdate(useAppStore as any, import.meta.hot))

export default useAppStore
