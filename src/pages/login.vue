<script setup lang="ts">
import { QForm } from 'quasar'

import http from '~/utils/axios'

interface ILogin {
  username: string
  password: string
}

const user = ref<ILogin>({
  username: '',
  password: '',
})
const isPwd = ref(true)
const { required, min } = useFormRules()

const form = ref<QForm | null>(null)
function handleSubmit() {
  form.value?.validate().then(async (res) => {
    if (res) {
      const { data } = await http.post('/login', user.value)

      localStorage.setItem('token', data.token)

      location.reload()
    }
  })
}
</script>

<template>
  <div>
    <QForm ref="form" mx-auto mt-10 w-600px border border-gray-300 rounded-lg px-6 py-8 shadow @submit.prevent="() => { }">
      <h3 color="#30B34A" text-24px>
        Log In
      </h3>
      <div mb-4>
        <q-input
          v-model="user.username" label="Login" dense outlined
          :rules="[(val) => !!val || 'Login kiritilishi shart!']" hint="Username" color="positive"
        />
      </div>
      <div mb-4>
        <q-input
          v-model="user.password" label="Password" outlined dense
          :rules="[required('Password not entered!'), min(6)]" :type="isPwd ? 'password' : 'text'"
          hint="Password with toggle" color="positive"
        >
          <template #append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </div>
      <div>
        <q-btn color="positive" style="width: 100%" type="submit" @click="handleSubmit">
          Login
        </q-btn>
      </div>
    </QForm>
  </div>
</template>

<route lang="yaml">
meta:
  layout: empty
  public: true
</route>
