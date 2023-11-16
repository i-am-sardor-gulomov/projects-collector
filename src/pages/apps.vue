<script setup lang="ts">
import useAppStore from '../stores/app'

const store = useAppStore()

onMounted(async () => {
  await store.fetchApps()
})
</script>

<template>
  <div class="row justify-center" mt-10 gap-10>
    <div v-for="card in store.apps" :key="card.id" class="col-3" rounded-lg p-6 shadow>
      <div id="info" m-4 text-12px>
        <div color="#5967ff" text-18px>
          App #{{ card.id }}
        </div>
        <q-separator />
        <div>
          Name: <b>{{ card.name }}</b>
        </div>
        <div>
          Description: <span color="gray">{{ card.description }}</span>
        </div>
        <div>
          Url: <code color="#1ca9c9"><a href="#" target="_blank">{{ card.url }}</a></code>
        </div>
        <div>
          Icon: <code color="gray">{{ card.icon }}</code>
        </div>
        <div>
          Status:
          <code v-if="card.status === false" color="#f00">{{ card.status }}</code>
          <code v-if="card.status === true" color="green">{{ card.status }}</code>
        </div>
        <div>
          Created at: <code color="orange">{{ card.created_at }}</code>
        </div>
        <div>
          Updated at: <code color="orange">{{ card.updated_at }}</code>
        </div>
        <div>
          Is active: <code color="green">{{ card.is_active }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row>div {
  border: 1px solid rgba(#999, .2);
}

#info {
  display: grid;
  justify-content: center;
}
</style>
