<script setup lang="ts">
function logout() {
  localStorage.clear()
  location.reload()
}
</script>

<template>
  <div mx-auto mt-10 w-400px border border-gray-300 rounded-lg px-6 py-8 shadow @submit.prevent="() => {}">
    <div color="red" text-24px>
      Log out
    </div>
    <div mb-5 text-16px>
      Are you sure logout?
    </div>
    <div flex gap-4>
      <q-btn color="warning" style="width: 50%;" clickable to="/">
        Cancel
      </q-btn>
      <q-btn color="negative" style="width: 50%;" @click="logout">
        Logout
      </q-btn>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: empty
</route>
