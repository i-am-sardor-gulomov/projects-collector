<script lang="ts" setup>
import { type QTableProps, useQuasar } from 'quasar'
import useUserStore from '../stores/user'
import http from '~/utils/axios'
import type { IIsActive, IUserData } from '~/types'

const store = useUserStore()

const notify = useNotify()
const q = useQuasar()
const activeness = ref<IIsActive>({
  is_active: true,
})

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
    name: 'on-off',
    label: 'On/Off',
    field: 'on-off',
    align: 'left',
  },
]

function handleActiveness(user: IUserData) {
  if (user.is_active === true)
    activeness.value.is_active = false
  else if (user.is_active === false)
    activeness.value.is_active = true

  q.dialog({
    title: 'Warning!',
    message: 'Are you sure to change this User\'s activeness!',
    cancel: true,
    persistent: true,
    color: 'orange',
  }).onOk(async () => {
    try {
      await http.patch(`/users/${user.id}`, activeness.value)
      await store.fetchUsers()
      notify.success('User activeness update successfully!')
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
    <div pl-6 text-36px color-gray-400>
      Update User Activeness
      <q-icon name="check" size="24px" />
    </div>
  </div>
  <div mx-5 mt-20>
    <q-table :columns="headers" :rows="store.users">
      <template #body-cell-on-off="props">
        <q-td :props="props">
          <q-btn flat rounded padding="6px" @click="handleActiveness(props.row)">
            <span i-carbon-power inline-block color-red />
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
