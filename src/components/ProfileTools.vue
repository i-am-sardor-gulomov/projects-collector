<script setup lang="ts">
import { Icon } from '@iconify/vue'
import useProfileStore from '~/stores/profile'

const store = useProfileStore()
onMounted(async () => {
  await store.fetchProfileInfo()
})
const active = ref('')
</script>

<template>
  <q-btn flat ml-4 rounded style="width: 200px;">
    <Icon icon="mdi:chevron-down" mr-4 />
    <div>{{ store.profile.fullname }}</div>
    <q-menu
      transition-show="jump-down"
      transition-hide="jump-up"
      fit
      :offset="[0, 10]"
    >
      <q-list style="min-width: 100px;">
        <q-item id="header">
          <q-item-section id="header_avatar" avatar>
            <Icon id="ava" icon="mdi:account" color-gray-400 />
          </q-item-section>
          <q-item-section>{{ store.profile.fullname }}</q-item-section>
        </q-item>
        <q-separator inset />
        <q-item
          clickable
          class="item"
          to="profile-info"
          :active="active === 'info'"
          active-class="my-menu-link"
          @click="active = 'info'"
        >
          <q-item-section avatar class="avatar">
            <Icon icon="mdi:clipboard-account-outline" color-gray-400 />
          </q-item-section>
          <q-item-section>Profile Info</q-item-section>
        </q-item>
        <q-item
          clickable
          class="item"
          to="account-settings"
          :active="active === 'settings'"
          active-class="my-menu-link"
          @click="active = 'settings'"
        >
          <q-item-section avatar class="avatar">
            <Icon icon="mdi:account-cog-outline" color-gray-400 />
          </q-item-section>
          <q-item-section>Account settings</q-item-section>
        </q-item>
        <q-item
          clickable
          class="item bottom"
          to="account-permissions"
          :active="active === 'permissions'"
          active-class="my-menu-link"
          @click="active = 'permissions'"
        >
          <q-item-section avatar class="avatar">
            <Icon icon="mdi:account-alert-outline" color-gray-400 />
          </q-item-section>
          <q-item-section>Account permissions</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable to="/logout" class="item">
          <q-item-section avatar class="avatar">
            <Icon icon="mdi:logout" color-gray-400 />
          </q-item-section>
          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<style scoped>
#header{
  min-height: 45px;
  padding: 6px 10px;
}
#header_avatar{
  min-width: 30px;
  min-height: 33px;
  padding: 0;
}
#ava{
  width: 22px;
  height: 22px;
}
.item{
  min-height: 30px;
  padding: 8px 12px;
}
.avatar{
  min-width: 25px;
  min-height: 25px;
  padding: 0;
}
.bottom{
  margin-bottom: 50px;
}
.my-menu-link{
  color: white;
  background: #99E4AD;
}
</style>
