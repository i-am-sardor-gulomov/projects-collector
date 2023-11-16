<script lang="ts" setup>
import { type QTableProps, useQuasar } from 'quasar'
import useAppStore from '../stores/app'
import http from '~/utils/axios'
import type { IAppData, IIsActive } from '~/types'

const store = useAppStore()

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

function handleActiveness(app: IAppData) {
  if (app.is_active === true)
    activeness.value.is_active = false
  else if (app.is_active === false)
    activeness.value.is_active = true

  q.dialog({
    title: 'Warning!',
    message: 'Are you sure to change this App\'s activeness!',
    cancel: true,
    persistent: true,
    color: 'orange',
  }).onOk(async () => {
    try {
      await http.patch(`/apps/${app.id}`, activeness.value)
      await store.fetchApps()
      notify.success('App activeness update successfully!')
    }
    catch (e: any) {
      notify.error(e.message)
    }
  })
}

onMounted(async () => {
  await store.fetchApps()
})
</script>

<template>
  <div flex items-center pa-2>
    <div pl-6 text-36px color-gray-400>
      Update App Activeness
      <q-icon name="check" size="24px" />
    </div>
  </div>
  <div mx-5 mt-20>
    <q-table :columns="headers" :rows="store.apps">
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
