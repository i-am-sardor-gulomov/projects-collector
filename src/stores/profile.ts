import { acceptHMRUpdate, defineStore } from 'pinia'
import http from '~/utils/axios'
import type { IProfileData, IProfileUpdate } from '~/types'

interface IState {
  profile: IProfileData
}
const useProfileStore = defineStore('profile', {
  state: (): IState => ({
    profile: {
      id: 0,
      username: '',
      fullname: '',
      phone: '',
      status: '',
      is_active: false,
      created_at: '',
      updated_at: '',
    },
  }),
  actions: {
    // Read
    async fetchProfileInfo() {
      try {
        const response = await http.get('/profile')
        this.profile = response.data
      }
      catch (e) {
        return Promise.reject(e)
      }
    },
    // Update
    async updateProfileInfo(profile: IProfileUpdate) {
      try {
        await http.put('/profile', profile)
        await this.fetchProfileInfo()
      }
      catch (e) {
        return Promise.reject(e)
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore as any, import.meta.hot))

export default useProfileStore
