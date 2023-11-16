<script setup lang="ts">
import useCredentialStore from '../stores/credential'

interface Props {
  appId: number
}
interface Emit {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const store = useCredentialStore()
function close() {
  emit('close')
}
onMounted(async () => {
  await store.fetchCredential(props.appId)
})
</script>

<template>
  <div mx-auto my-10 w-300px border border-gray-300 rounded-lg p-6 shadow>
    <div id="info" m-4 text-12px>
      <div flex items-center>
        <div color="#5967ff" text-18px>
          Info App credential for App #{{ props.appId }}
        </div>
        <q-space />
        <q-btn flat rounded padding="6px" @click="close">
          <span i-carbon:close-large text-lg color="red" />
        </q-btn>
      </div>
      <q-separator />
      <div>
        Login: <b>{{ store.credential.login }}</b>
      </div>
      <div>
        Password: {{ store.credential.password }}
      </div>
      <div v-if="!store.credential.login" color="#f00">
        <q-icon name="warning" m-1 />
        {{ store.message }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#info {
  display: grid;
  justify-content: center;
}
</style>
