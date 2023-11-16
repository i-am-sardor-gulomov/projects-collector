<script setup lang="ts">
import useAppStore from '../stores/app'
import useCredentialStore from '../stores/credential'
import type { IEnter } from '~/types'

const store = useAppStore()
const storeCredentials = useCredentialStore()
const enterCard = ref(false)
const clickCount = ref(0)

const user = ref<IEnter>({
  id: 0,
  username: '',
  password: '',
  urlBackend: '',
  urlFrontend: '',
})

async function getAccess(id: number) {
  clickCount.value++
  user.value.urlBackend = store.apps[id - 1].icon
  user.value.urlFrontend = store.apps[id - 1].url
  storeCredentials.fetchCredential(id)
  if (clickCount.value === 2) {
    user.value.id = storeCredentials.user.id
    user.value.username = storeCredentials.user.username
    user.value.password = storeCredentials.user.password
    enterCard.value = true
    clickCount.value = 0
  }
  // console.log(storeCredentials.user)
  // console.log(user.value)
}

onMounted(async () => {
  await store.fetchApps()
  clickCount.value = 0
})
</script>

<template>
  <EnterToApp v-if="enterCard" :user="user" @close="enterCard = false" />
  <div class="row justify-center" mt-10 gap-10>
    <div v-for="card in store.apps" :key="card.id" class="col-3" rounded-lg p-6 shadow>
      <div flex items-center>
        <div color="#5967ff" text-18px>
          App #{{ card.id }}
        </div>
      </div>
      <q-separator />
      <div mb-5 text-12px>
        <div mt-4>
          <b>Name: </b>
          <code color="#1ca9c9">{{ card.name }}</code>
        </div>
        <div>
          <b>Url: </b>
          <code color="#1ca9c9">{{ card.url }}</code>
        </div>
        <div>
          <b>Status: </b>
          <code v-if="card.status === false" color="#f00">{{ card.status }}</code>
          <code v-if="card.status === true" color="green">{{ card.status }}</code>
        </div>
      </div>
      <q-btn v-if="card.status === true" color="positive" style="width: 100%;" @click="getAccess(card.id)">
        Get Access
      </q-btn>
      <q-btn v-if="card.status === false" disable color="negative" style="width: 100%;">
        No Access
      </q-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row>div {
  border: 1px solid rgba(#999, .2);
}
</style>
