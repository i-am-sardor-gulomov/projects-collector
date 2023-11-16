<script lang="ts" setup>
import useProfileStore from '~/stores/profile'

const store = useProfileStore()
const admin = ref(false)
const developer = ref(false)

function status() {
  if (store.profile.status === 'admin')
    admin.value = true
  else if (store.profile.status === 'developer')
    developer.value = true
}

onMounted(async () => {
  await store.fetchProfileInfo()
  status()
})
</script>

<template>
  <div mx-auto mt-10 w-500px border border-gray-300 rounded-lg p-6 shadow>
    <div flex>
      <div m-5 mr-10>
        <q-avatar id="ava">
          <div id="avatar" border border-green-600>
            <img v-if="admin" src="../img/admin.png" alt="User">
            <img v-if="developer" src="../img/developer.png" alt="User">
          </div>
        </q-avatar>
      </div>
      <q-separator vertical shadow />
      <div id="info" ml-2 text-12px>
        <div>
          <span>Id: <span color="red">{{ store.profile.id }}</span></span>
        </div>
        <div>
          <span>FullName: <b>{{ store.profile.fullname }}</b></span>
        </div>
        <div>
          <span>UserName: <span color="gray">{{ store.profile.username }}</span></span>
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
    <!-- <q-separator /> -->
    <div mt-4 text-12px>
      In this program, you have the following rights:
      <table style="width:100%">
        <tr>
          <th id="act">
            Action task
          </th>
          <th>Description</th>
        </tr>
        <tr v-if="admin">
          <td>List users</td>
          <td>Get List users</td>
        </tr>
        <tr v-if="admin">
          <td>Create user</td>
          <td>Create new user</td>
        </tr>
        <tr v-if="admin">
          <td>Retrieve user</td>
          <td>Retrieve single user data</td>
        </tr>
        <tr v-if="admin">
          <td>Update user</td>
          <td>Update single user data</td>
        </tr>
        <tr v-if="admin">
          <td>Destroy user</td>
          <td>Delete single user from list</td>
        </tr>
        <tr>
          <td>List apps</td>
          <td>Get List apps</td>
        </tr>
        <tr v-if="admin">
          <td>Create app</td>
          <td>Create new app</td>
        </tr>
        <tr>
          <td>Retrieve app</td>
          <td>Retrieve single app data</td>
        </tr>
        <tr v-if="admin">
          <td>Update app</td>
          <td>Update single app data</td>
        </tr>
        <tr v-if="admin">
          <td>Destroy app</td>
          <td>Delete single app from list</td>
        </tr>
        <tr>
          <td>Create credential</td>
          <td>Create credential for single app</td>
        </tr>
        <tr>
          <td>Retrieve credential</td>
          <td>Retrieve credential data of single app</td>
        </tr>
        <tr>
          <td>Update credential</td>
          <td>Update credential for single app</td>
        </tr>
        <tr>
          <td>Get token</td>
          <td>Get token for single app</td>
        </tr>
        <tr v-if="admin">
          <td>Update app activeness</td>
          <td>Update activeness for single app</td>
        </tr>
        <tr v-if="admin">
          <td>Update user activeness</td>
          <td>Update activeness for single user</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
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
table, th, td {
  border: 1px solid #CFD7E1;
  border-collapse: collapse;
  color: #7A7776;
}
th {
  text-align: left;
  padding-left: 10px;
}
td{
  padding-left: 10px;
}
#act{
  width: 40%;
}
</style>
