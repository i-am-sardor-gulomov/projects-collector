<script lang="ts" setup>
import { type QTableProps, useQuasar } from 'quasar'
import useUserStore from '../stores/user'
import type { IUserData, IUserDelete, IUserUpdate } from '~/types'

const dataUser = ref<IUserUpdate>({
  id: 0,
  username: '',
  fullname: '',
  phone: '',
  password: '',
  password_confirm: '',
  status: '',
  super_password: '',
})
const info = ref<IUserData>({
  id: 0,
  username: '',
  fullname: '',
  phone: '',
  status: '',
  is_active: true,
  created_at: '',
  updated_at: '',
})

const deleteUser = ref<IUserDelete>({
  super_password: '',
})

const store = useUserStore()

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
    name: 'username',
    label: 'Username',
    field: 'username',
    align: 'left',
  },
  {
    name: 'fullname',
    label: 'Fullname',
    field: 'fullname',
    align: 'left',
  },
  {
    name: 'phone',
    label: 'Phone',
    field: 'phone',
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
    label: 'Is active',
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
function handleInfo(user: IUserData) {
  createCard.value = false
  infoCard.value = true
  updateCard.value = false
  info.value = user
}
function handleUpdate(user: IUserUpdate) {
  createCard.value = false
  infoCard.value = false
  updateCard.value = true
  dataUser.value = user
}
function handleDelete(id: number) {
  createCard.value = false
  infoCard.value = false
  updateCard.value = false
  q.dialog({
    title: `Deleting User #${id}`,
    message: `Enter the super password to delete the User ${id}`,
    prompt: {
      model: '',
      type: 'password',
      label: 'Super Password',
    },
    cancel: true,
    persistent: true,
    color: 'orange',
  }).onOk(async (data) => {
    try {
      deleteUser.value.super_password = data
      await store.deleteUser(id, deleteUser.value)
      notify.success('Deleting successfully!')
    }
    catch (e: any) {
      notify.error(e.message)
    }
  })
}

onMounted(async () => {
  await store.fetchUsers()
})
</script>

<template>
  <div flex items-center pa-2>
    <div pl-2 text-36px color-gray-400>
      User Settings
      <q-icon name="settings" size="24px" />
    </div>
    <q-space />
    <q-btn color="primary" mr-2 rounded @click="handleCreate">
      <span i-carbon:add-filled mr-2 />
      Create
    </q-btn>
  </div>
  <CreateUser v-if="createCard" @close="createCard = false" />
  <InfoUser v-if="infoCard" :info="info" @close="infoCard = false" />
  <UpdateUser v-if="updateCard" :data-user="dataUser" @close="updateCard = false" />
  <div m-5>
    <q-table :columns="headers" :rows="store.users">
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat rounded padding="6px" @click="handleInfo(props.row)">
            <span i-carbon:information inline-block color-cyan />
          </q-btn>
          <q-btn flat rounded padding="6px" @click="handleUpdate(props.row)">
            <span i-carbon:pen inline-block color-orange />
          </q-btn>
          <q-btn flat rounded padding="6px" @click="handleDelete(props.row.id)">
            <span i-carbon-trash-can inline-block color-red />
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
