<script setup lang="ts">
import useProfileStore from '~/stores/profile'
import type { IProfileUpdate } from '~/types'

const store = useProfileStore()
const notify = useNotify()
const isPwd = ref(true)
const isCPwd = ref(true)
const isSPwd = ref(true)

const values = ref<IProfileUpdate>({
  fullname: '',
  username: '',
  phone: '',
  password: '',
  password_confirm: '',
  super_password: '',
})

function reset() {
  values.value.fullname = ''
  values.value.username = ''
  values.value.phone = ''
  values.value.password = ''
  values.value.password_confirm = ''
  values.value.super_password = ''
}
async function save() {
  try {
    await store.updateProfileInfo(values.value)
    notify.success('Profile Info updated successfully!')
  }
  catch (error: any) {
    notify.error(error.response.data.message)
  }
}
</script>

<template>
  <div p-6>
    <div text-24px color-gray-400>
      Edit Profile
      <q-icon name="edit" size="20px" />
    </div>
    <div class="row" my-6 gap-4>
      <div class="col">
        <b>Fullname</b>
        <q-input v-model="values.fullname" outlined dense label="fullname" />
      </div>
      <div class="col">
        <b>Username</b>
        <q-input v-model="values.username" outlined dense label="username" />
      </div>
    </div>
    <div style="width: 45%;" my-6>
      <b>Phone</b>
      <q-input v-model="values.phone" outlined dense label="phone" mask="(##) ### - ## - ##" fill-mask="#" />
    </div>
    <div class="row" my-6 gap-4>
      <div class="col">
        <b>New Password</b>
        <q-input
          v-model="values.password" outlined dense label="password" :type="isPwd ? 'password' : 'text'"
          :rules="[val => !!val || 'Parol kamida 6 ta belgidan iborat bo\'lishi shart!']"
        >
          <template #append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </div>
      <div class="col">
        <b>New Password confirm</b>
        <q-input
          v-model="values.password_confirm" outlined dense label="password_confirm"
          :type="isCPwd ? 'password' : 'text'" :rules="[val => !!val || 'Login kiritilishi shart!']"
        >
          <template #append>
            <q-icon :name="isCPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isCPwd = !isCPwd" />
          </template>
        </q-input>
      </div>
    </div>
    <div style="width: 45%;" mb-6>
      <b>Old password</b>
      <q-input
        v-model="values.super_password" outlined dense label="super_password"
        :type="isSPwd ? 'password' : 'text'" :rules="[val => !!val || 'Login kiritilishi shart!']"
      >
        <template #append>
          <q-icon :name="isSPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isSPwd = !isSPwd" />
        </template>
      </q-input>
    </div>
    <div flex gap-2 py-2>
      <q-btn color="negative" style="width: 20%;" type="submit" rounded @click="reset">
        Reset
      </q-btn>
      <q-btn color="positive" style="width: 20%;" type="submit" rounded @click="save">
        Save
      </q-btn>
    </div>
  </div>
</template>
