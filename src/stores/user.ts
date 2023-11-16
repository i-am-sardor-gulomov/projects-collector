import { acceptHMRUpdate, defineStore } from 'pinia'
import http from '~/utils/axios'
import type { IUserCreate, IUserData, IUserUpdate } from '~/types'

interface IState {
  users: IUserData[]
}
const useUserStore = defineStore('user', {
  state: (): IState => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await http.get('/users?_page=1&_sort=id&_order=desc')
        this.users = response.data
      }
      catch (e) {
        return Promise.reject(e)
      }
    },
    async createUser(user: IUserCreate) {
      try {
        await http.post('/users', user)
        await this.fetchUsers()
      }
      catch (e) {
        return Promise.reject(e)
      }
    },
    async updateUser(user: IUserUpdate) {
      try {
        await http.put(`/users/${user.id}`, user)
        await this.fetchUsers()
      }
      catch (e) {
        return Promise.reject(e)
      }
    },
    async deleteUser(id: number, data: any) {
      try {
        await http.post(`/users/${id}`, data)
        await this.fetchUsers()
      }
      catch (e) {
        return Promise.reject(e)
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))

export default useUserStore
