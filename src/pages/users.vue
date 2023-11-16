<script setup lang="ts">
import useUserStore from '../stores/user'

const store = useUserStore()

onMounted(async () => {
  await store.fetchUsers()
})
</script>

<template>
  <div class="row justify-center" mt-10 gap-10>
    <div v-for="card in store.users" :key="card.id" class="col-3" rounded-lg p-6 shadow>
      <div id="ava_wrapper" mb-4>
        <q-avatar id="ava">
          <div id="avatar" border border-green-600>
            <img v-if="card.status === 'admin'" src="../img/admin.png" alt="User">
            <img v-if="card.status === 'developer'" src="../img/developer.png" alt="User">
          </div>
        </q-avatar>
      </div>
      <div id="info" text-12px>
        <div color="#5967ff" text-18px>
          User #{{ card.id }}
        </div>
        <q-separator />
        <div>
          FullName: <b>{{ card.fullname }}</b>
        </div>
        <div>
          UserName: <span color="gray">{{ card.username }}</span>
        </div>
        <div>
          Phone: <code color="#1ca9c9">{{ card.phone }}</code>
        </div>
        <div>
          Created at: <code color="orange">{{ card.created_at }}</code>
        </div>
        <div>
          Updated at: <code color="orange">{{ card.updated_at }}</code>
        </div>
        <div>
          Is active:
          <code v-if="card.is_active === false" color="#f00">{{ card.is_active }}</code>
          <code v-if="card.is_active === true" color="green">{{ card.is_active }}</code>
        </div>
        <div flex items-center>
          Status:
          <q-icon v-if="card.status === 'admin'" name="star" color="orange" m-1 />
          <q-icon v-if="card.status === 'developer'" name="code" color="orange" m-1 />
          <code color="orange">{{ card.status }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row>div {
  border: 1px solid rgba(#999, .2);
}

#ava_wrapper {
  display: flex;
  justify-content: center;
}

#ava {
  width: 80px;
  height: 80px;
}

#avatar {
  border-radius: 40px;
}

#info {
  display: grid;
  justify-content: center;
}
</style>
