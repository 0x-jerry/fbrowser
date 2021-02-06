<template>
  <div class="file">{{ store.dir }}</div>
</template>

<script>
import { store } from './store'

export default {
  data() {
    return {
      store
    }
  },
  mounted() {
    store.dir
  }
  // file() {
  // }
}
</script>

<style></style>
