<script setup lang="ts">
import { QForm } from 'quasar'
import type { IEnter } from '~/types'
import http from '~/utils/axiosForApps.js'

interface Props {
  user: IEnter
}
interface Emit {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const isPwd = ref(true)
const user = ref<IEnter>({
  id: props.user.id,
  username: props.user.username,
  password: props.user.password,
  urlBackend: props.user.urlBackend,
  urlFrontend: props.user.urlFrontend,
})

const form = ref<QForm | null>(null)
function handleSubmit() {
  form.value?.validate().then(async (res) => {
    if (res) {
      const { data } = await http.post('/authentication', { username: user.value.username, password: user.value.password }, { baseURL: user.value.urlBackend })
      // console.log(data)
      // const getToken = await http.get(`/apps/${user.value.id}/token`)
      // console.log(getToken)
      localStorage.setItem('accessToken', data.accessToken)

      window.open(user.value.urlFrontend, '_blank')
      // router.push('/')
      // window.location.href = `${user.value.urlFrontend}`
      // location.reload()
    }
  })
}
function close() {
  emit('close')
}
</script>

<template>
  <div mx-auto mt-10 w-400px border border-gray-300 rounded-lg p-4 shadow>
    <QForm
      ref="form"
      @submit.prevent="() => { }"
    >
      <div flex items-center>
        <div color="#30B34A" pl-2 text-24px>
          Enter To App #{{ user.id }}
        </div>
        <q-space />
        <q-btn flat rounded padding="6px" @click="close">
          <span i-carbon:close-large text-lg color="red" />
        </q-btn>
      </div>
      <div mb-4 px-2 pt-2>
        <q-input
          v-model="user.username" label="Login" dense outlined
          :rules="[(val) => !!val || 'Login kiritilishi shart!']" hint="Username" color="positive"
        />
      </div>
      <div mb-4 px-2>
        <q-input
          v-model="user.password" label="Password" outlined dense
          :rules="[(val) => !!val || 'Parol kiritilishi shart!']" :type="isPwd ? 'password' : 'text'"
          hint="Password with toggle" color="positive"
        >
          <template #append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div px-2 pb-2>
        <q-btn color="positive" style="width: 100%" type="submit" @click="handleSubmit">
          Submit
        </q-btn>
      </div>
      <!-- <div px-2 pb-2>
        <a :href="user.urlFrontend">
          <q-btn color="positive" style="width: 100%">
            Enter
          </q-btn>
        </a>
      </div> -->
    </QForm>
  </div>
</template>
