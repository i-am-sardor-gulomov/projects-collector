<script lang="ts" setup>
import useProfileStore from '~/stores/profile'

const store = useProfileStore()
const admin = ref(false)
const developer = ref(false)

function avatar() {
  if (store.profile.status === 'admin')
    admin.value = true
  else if (store.profile.status === 'developer')
    developer.value = true
}

onMounted(async () => {
  await store.fetchProfileInfo()
  avatar()
})
</script>

<template>
  <div mx-auto mt-10 w-400px border border-gray-300 rounded-lg p-6 shadow>
    <div id="ava_wrapper" mb-4>
      <q-avatar id="ava">
        <div id="avatar" border border-green-600>
          <img v-if="admin" src="../img/admin.png" alt="User">
          <img v-if="developer" src="../img/developer.png" alt="User">
        </div>
      </q-avatar>
    </div>
    <div id="info" text-15px>
      <div>
        <span>Id: <span color="red">{{ store.profile.id }}</span></span>
      </div>
      <div>
        <span>FullName: <span text-20px>{{ store.profile.fullname }}</span></span>
      </div>
      <div>
        <span>UserName: <span text-18px color="gray">{{ store.profile.username }}</span></span>
      </div>
      <div>
        <span>Phone: <code color="#1ca9c9">{{ store.profile.phone }}</code></span>
      </div>
      <div flex items-center>
        <span>Status: </span>
        <q-icon v-if="admin" name="star" color="orange" m-1 />
        <q-icon v-if="developer" name="code" color="orange" m-1 />
        <code color="orange">{{ store.profile.status }}</code>
      </div>
    </div>
  </div>
</template>

<style scoped>
#ava_wrapper {
  display: flex;
  justify-content: center;
}

#ava {
  width: 100px;
  height: 100px;
}

#avatar {
  border-radius: 50px;
}

#info {
  display: grid;
  justify-content: center;
}
</style>
