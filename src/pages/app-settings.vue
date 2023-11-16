<script lang="ts" setup>
import { type QTableProps, useQuasar } from 'quasar'
import useAppStore from '../stores/app'
import useProfileStore from '~/stores/profile'
import type { IApp, IAppData } from '~/types'

const info = ref<IAppData>({
  id: 0,
  name: '',
  description: '',
  url: '',
  icon: '',
  status: true,
  created_at: '',
  updated_at: '',
  is_active: true,
})
const currentApp = ref<IApp>({
  id: 0,
  name: '',
  description: '',
  url: '',
  icon: '',
})
const store = useAppStore()
const status = useProfileStore()
const admin = ref(false)
const notify = useNotify()
const q = useQuasar()

const createCard = ref(false)
const infoCard = ref(false)
const updateCard = ref(false)

const headers: QTableProps['columns'] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
  },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'left',
  },
  {
    name: 'url',
    label: 'url',
    field: 'url',
    align: 'left',
  },
  {
    name: 'icon',
    label: 'Icon',
    field: 'icon',
    align: 'left',
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'left',
  },
  {
    name: 'is_active',
    label: 'Is_active',
    field: 'is_active',
    align: 'left',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'left',
  },
]

function handleCreate() {
  createCard.value = true
  infoCard.value = false
  updateCard.value = false
}
function handleInfo(app: IAppData) {
  createCard.value = false
  infoCard.value = true
  updateCard.value = false
  info.value = app
}
function handleUpdate(app: IApp) {
  createCard.value = false
  infoCard.value = false
  updateCard.value = true
  currentApp.value = app
}
function handleDelete(id: number) {
  q.dialog({
    title: 'Warning!',
    message: 'Are you sure for deleting this App in list!',
    cancel: true,
    persistent: true,
    color: 'orange',
  }).onOk(async () => {
    try {
      await store.deleteApp(id)
      notify.success('Deleting successfully!')
    }
    catch (e: any) {
      notify.error(e.message)
    }
  })
}

function statusFunc() {
  if (status.profile.status === 'admin')
    admin.value = true
}

onMounted(async () => {
  await store.fetchApps()
  await status.fetchProfileInfo()
  statusFunc()
})
</script>

<template>
  <div flex items-center pa-2>
    <div pl-6 text-36px color-gray-400>
      App Settings
      <q-icon name="settings" size="24px" />
    </div>
    <q-space />
    <q-btn v-if="admin" color="primary" mr-2 rounded @click="handleCreate">
      <span i-carbon:add-filled mr-2 />
      Create
    </q-btn>
  </div>
  <CreateApp v-if="createCard && admin" @close="createCard = false" />
  <InfoApp v-if="infoCard" :info="info" @close="infoCard = false" />
  <UpdateApp v-if="updateCard && admin" :current-app="currentApp" @close="updateCard = false" />
  <div m-5>
    <q-table :columns="headers" :rows="store.apps">
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat rounded padding="6px" @click="handleInfo(props.row)">
            <span i-carbon:information inline-block color-cyan />
          </q-btn>
          <q-btn v-if="admin" flat rounded padding="6px" @click="handleUpdate(props.row)">
            <span i-carbon:pen inline-block color-orange />
          </q-btn>
          <q-btn v-if="admin" flat rounded padding="6px" @click="handleDelete(props.row.id)">
            <span i-carbon-trash-can inline-block color-red />
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
