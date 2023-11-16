<script lang="ts" setup>
import { type QTableProps } from 'quasar'
import useAppStore from '../stores/app'
import useCredentialStore from '~/stores/credential'

const appId = ref<number>(0)
const store = useAppStore()

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
    name: 'create',
    label: 'Create credential',
    field: 'credentials',
    align: 'left',
  },
  {
    name: 'retrieve',
    label: 'Retrieve credential',
    field: 'retrieve',
    align: 'left',
  },
  {
    name: 'update',
    label: 'Update credential',
    field: 'update',
    align: 'left',
  },
]

function handleCreate(id: number) {
  createCard.value = true
  infoCard.value = false
  updateCard.value = false
  appId.value = id
  useCredentialStore().fetchCredential(id)
}
function handleInfo(id: number) {
  createCard.value = false
  infoCard.value = true
  updateCard.value = false
  appId.value = id
  useCredentialStore().fetchCredential(id)
}
function handleUpdate(id: number) {
  createCard.value = false
  infoCard.value = false
  updateCard.value = true
  appId.value = id
  useCredentialStore().fetchCredential(id)
}
onMounted(async () => {
  await store.fetchApps()
})
</script>

<template>
  <div flex items-center pa-2>
    <div pl-6 text-36px color-gray-400>
      App Credential Settings
      <q-icon name="settings" size="24px" />
    </div>
  </div>
  <CreateCredential v-if="createCard" :app-id="appId" @close="createCard = false" />
  <InfoCredential v-if="infoCard" :app-id="appId" @close="infoCard = false" />
  <UpdateCredential v-if="updateCard" :app-id="appId" @close="updateCard = false" />
  <div m-5 mb-10>
    <q-table :columns="headers" :rows="store.apps">
      <template #body-cell-create="props">
        <q-td :props="props">
          <q-btn color="green" rounded outline padding="6px" @click="handleCreate(props.row.id)">
            <span i-carbon:ibm-cloud-key-protect inline-block color-green />
            <span ml-2 text-12px>Create</span>
          </q-btn>
        </q-td>
      </template>
      <template #body-cell-retrieve="props">
        <q-td :props="props">
          <q-btn color="cyan" rounded outline padding="6px" @click="handleInfo(props.row.id)">
            <span i-carbon:view inline-block color-cyan />
            <span ml-2 text-12px>Retrieve</span>
          </q-btn>
        </q-td>
      </template>
      <template #body-cell-update="props">
        <q-td :props="props">
          <q-btn color="orange" rounded outline padding="6px" @click="handleUpdate(props.row.id)">
            <span i-carbon:pen inline-block color-orange />
            <span ml-2 text-12px>Update</span>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
