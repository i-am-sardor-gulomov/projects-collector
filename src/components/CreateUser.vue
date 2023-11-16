<script lang="ts" setup>
import useUserStore from '~/stores/user'
import type { IUserCreate } from '~/types'

interface Emit {
  (e: 'close'): void
}

const emit = defineEmits<Emit>()
const store = useUserStore()
const notify = useNotify()
const isPwd = ref(true)
const isCPwd = ref(true)

const values = ref<IUserCreate>({
  username: '',
  fullname: '',
  phone: '',
  password: '',
  password_confirm: '',
  status: '',
})

const options = [
  'developer',
  'admin',
]

async function handleSave() {
  try {
    await store.createUser(values.value)
    notify.success('New user created successfully!')
  }
  catch (error: any) {
    notify.error(error.message)
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
          Create New User
        </div>
        <q-space />
        <q-btn flat rounded padding="6px" @click="close">
          <span i-carbon:close-large text-lg color="red" />
        </q-btn>
      </div>
      <div class="row" gap-2 p-2>
        <div class="col">
          <q-input v-model="values.username" outlined dense label="Username" :rules="[(val) => !!val || 'Username kiritilishi shart!']" hint="Username" color="positive" />
        </div>
        <div class="col">
          <q-input v-model="values.fullname" outlined dense label="Fullname" :rules="[(val) => !!val || 'Fullname kiritilishi shart!']" hint="Fullname" color="positive" />
        </div>
      </div>
      <div class="row" p-2>
        <div class="col-6">
          <q-input v-model="values.phone" outlined dense label="Phone" mask="(##) ### - ## - ##" fill-mask="#" hint="Phone" color="positive" />
        </div>
      </div>
      <div class="row" gap-2 p-2>
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
        <div class="col">
          <q-input
            v-model="values.password_confirm" outlined dense label="Password_confirm" :rules="[(val) => !!val || 'Parol kiritilishi shart!']" :type="isCPwd ? 'password' : 'text'"
            hint="Password with toggle" color="positive"
          >
            <template #append>
              <q-icon :name="isCPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isCPwd = !isCPwd" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row" p-2>
        <div class="col-6">
          <q-select v-model="values.status" :options="options" outlined dense label="status" />
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
