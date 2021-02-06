<template>
  <div class="fbrowser flex flex-col">
    <f-file />
    <explore class="pb-14"></explore>
    <div
      v-if="title"
      class="fixed bottom-0 left-0 text-center bg-gray-100 border-t border-gray-400 w-full p-2 truncate"
    >
      {{ title }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import Explore from './components/Explore.vue'
import { store } from './components/store'
import FFile from './components/FFile.vue'

export default {
  components: {
    Explore,
    FFile
  },
  setup() {
    return {
      title: computed(() => store.current.name)
    }
  }
}
</script>

<style lang="less">
.fbrowser {
  height: 100vh;
}
</style>
