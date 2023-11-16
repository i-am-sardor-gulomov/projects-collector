<script setup lang="ts">
import type { IAppData } from '~/types'

interface Props {
  info: IAppData
}
interface Emit {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
function close() {
  emit('close')
}
</script>

<template>
  <div mx-auto my-10 w-300px border border-gray-300 rounded-lg p-6 shadow>
    <div id="info" m-4 text-12px>
      <div flex items-center>
        <div color="#5967ff" text-18px>
          Info App #{{ props.info.id }}
        </div>
        <q-space />
        <q-btn flat rounded padding="6px" @click="close">
          <span i-carbon:close-large text-lg color="red" />
        </q-btn>
      </div>
      <q-separator />
      <div>
        Name: <b>{{ props.info.name }}</b>
      </div>
      <div>
        Description: <span color="gray">{{ props.info.description }}</span>
      </div>
      <div>
        Url: <code color="#1ca9c9"><a href="#" target="_blank">{{ props.info.url }}</a></code>
      </div>
      <div>
        Icon: <code color="gray">{{ props.info.icon }}</code>
      </div>
      <div>
        Status: <code color="#f00">{{ props.info.status }}</code>
      </div>
      <div>
        Created at: <code color="orange">{{ props.info.created_at }}</code>
      </div>
      <div>
        Updated at: <code color="orange">{{ props.info.updated_at }}</code>
      </div>
      <div>
        Is active: <code color="green">{{ props.info.is_active }}</code>
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
