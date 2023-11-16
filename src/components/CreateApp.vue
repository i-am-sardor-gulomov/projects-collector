<script setup lang="ts">
import useAppStore from '../stores/app'
import type { IApp } from '~/types'

interface Emit {
  (e: 'close'): void
}

const emit = defineEmits<Emit>()
const store = useAppStore()
const notify = useNotify()

const values = ref<IApp>({
  id: null,
  name: '',
  description: '',
  url: '',
  icon: '',
})

async function handleSave() {
  try {
    await store.createApp(values.value)
    notify.success('New App created successfully!')
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
          Create New App
        </div>
        <q-space />
        <q-btn flat rounded padding="6px" @click="close">
          <span i-carbon:close-large text-lg color="red" />
        </q-btn>
      </div>
      <div class="row" gap-2 p-2>
        <div
          class="col"
        >
          <q-input
            v-model="values.name"
            outlined
            dense
            label="Name"
            :rules="[(val) => !!val || 'Name kiritilishi shart!']" hint="Name" color="positive"
          />
        </div>
        <div
          class="col"
        >
          <q-input
            v-model="values.description"
            outlined
            dense
            label="Description"
            :rules="[(val) => !!val || 'Description kiritilishi shart!']" hint="Description" color="positive"
          />
        </div>
      </div>
      <div class="row" gap-2 p-2>
        <div
          class="col"
        >
          <q-input
            v-model="values.url"
            outlined
            dense
            label="Url"
            :rules="[(val) => !!val || 'Url kiritilishi shart!']" hint="Url" color="positive"
          />
        </div>
        <div
          class="col"
        >
          <q-input
            v-model="values.icon"
            outlined
            dense
            label="Icon"
            :rules="[(val) => !!val || 'Icon kiritilishi shart!']" hint="Icon" color="positive"
          />
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
