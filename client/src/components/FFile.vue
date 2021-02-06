<template>
  <div class="folder" v-if="!store.current"></div>
  <div class="file" v-else>
    <f-audio :file="store.current.name" v-if="store.current.type.startsWith('audio')" />
    <f-video :file="store.current.name" v-else-if="store.current.type.startsWith('video')" />
    <div class="w-full flex justify-center items-center h-24 border-b border-gray-400 bg-gray-100" v-else>
      {{ store.file?.name }}
    </div>
  </div>
</template>

<script>
import FAudio from './FAudio.vue'
import FVideo from './FVideo.vue'
import { store } from './store'

export default {
  components: {
    FAudio,
    FVideo
  },
  data() {
    return {
      store
    }
  }
}
</script>

<style></style>
