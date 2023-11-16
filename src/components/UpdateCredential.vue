<script setup lang="ts">
import useCredentialStore from '../stores/credential'
import type { ICredentialUpdate } from '~/types'

interface Props {
  appId: number
}
interface Emit {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const store = useCredentialStore()
const notify = useNotify()
const isPwd = ref(true)
const isSPwd = ref(true)

const values = ref<ICredentialUpdate>({
  app_id: props.appId,
  login: '',
  password: '',
  super_password: '',
})

async function handleSave() {
  try {
    await store.updateCredential(values.value)
    notify.success('App credential updated successfully!')
  }
  catch (error: any) {
    notify.error(store.message)
  }
}
function close() {
  emit('close')
}
</script>

<template>
  <div mx-4 mb-10 border border-gray-300 rounded-lg p-4 shadow>
    <QForm @submit.prevent="() => { }">
      <div flex items-center>
        <div color="#30B34A" pl-2 text-24px>
          Update App credential for App #{{ props.appId }}
        </div>
        <q-space />
        <q-btn flat rounded padding="6px" @click="close">
          <span i-carbon:close-large text-lg color="red" />
        </q-btn>
      </div>
      <div class="row" gap-2 p-2>
        <div class="col">
          <q-input v-model="values.login" outlined dense label="Login" :rules="[(val) => !!val || 'Login kiritilishi shart!']" hint="Username" color="positive" />
        </div>
        <div class="col">
          <q-input
            v-model="values.password" outlined dense label="Password" :rules="[(val) => !!val || 'Parol kiritilishi shart!']" :type="isPwd ? 'password' : 'text'"
            hint="Password with toggle" color="positive"
          >
            <template #append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row" p-2>
        <div class="col-6">
          <q-input
            v-model="values.super_password" outlined dense label="Super password" :rules="[(val) => !!val || 'Super Parol kiritilishi shart!']" :type="isSPwd ? 'password' : 'text'"
            hint="Password with toggle" color="positive"
          >
            <template #append>
              <q-icon :name="isSPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isSPwd = !isSPwd" />
            </template>
          </q-input>
        </div>
      </div>
      <div p-2 pl-4>
        <q-btn color="positive" style="width: 20%;" type="submit" rounded @click="handleSave">
          Submit
        </q-btn>
      </div>
    </QForm>
  </div>
</template>
