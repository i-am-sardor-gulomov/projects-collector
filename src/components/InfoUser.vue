<script setup lang="ts">
import type { IUserData } from '~/types'

interface Props {
  info: IUserData
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
    <div id="ava_wrapper" mb-4>
      <q-avatar id="ava">
        <div id="avatar" border border-green-600>
          <img v-if="props.info.status === 'admin'" src="../img/admin.png" alt="User">
          <img v-if="props.info.status === 'developer'" src="../img/developer.png" alt="User">
        </div>
      </q-avatar>
    </div>
    <div id="info" text-12px>
      <div flex items-center>
        <div color="#5967ff" text-18px>
          Info User #{{ props.info.id }}
        </div>
        <q-space />
        <q-btn flat rounded padding="6px" @click="close">
          <span i-carbon:close-large text-lg color="red" />
        </q-btn>
      </div>
      <q-separator />
      <div>
        FullName: <b>{{ props.info.fullname }}</b>
      </div>
      <div>
        UserName: <span color="gray">{{ props.info.username }}</span>
      </div>
      <div>
        Phone: <code color="#1ca9c9">{{ props.info.phone }}</code>
      </div>
      <div>
        Created at: <code color="orange">{{ props.info.created_at }}</code>
      </div>
      <div>
        Updated at: <code color="orange">{{ props.info.updated_at }}</code>
      </div>
      <div>
        Is active:
        <code v-if="props.info.is_active === false" color="#f00">{{ props.info.is_active }}</code>
        <code v-if="props.info.is_active === true" color="green">{{ props.info.is_active }}</code>
      </div>
      <div flex items-center>
        Status:
        <q-icon v-if="props.info.status === 'admin'" name="star" color="orange" m-1 />
        <q-icon v-if="props.info.status === 'developer'" name="code" color="orange" m-1 />
        <code color="orange">{{ props.info.status }}</code>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#ava_wrapper {
  display: flex;
  justify-content: center;
}

#ava {
  width: 80px;
  height: 80px;
}

#avatar {
  border-radius: 40px;
}

#info {
  display: grid;
  justify-content: center;
}
</style>
