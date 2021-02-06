<template>
  <div class="file h-52 bg-gray-100 relative shadow" v-if="store.current.show">
    <f-audio :file="url" v-if="type.startsWith('audio')" />
    <f-video :file="url" v-else-if="type.startsWith('video')" />
    <f-text :file="url" v-else-if="type.startsWith('text')" />
    <f-image :file="url" v-else-if="type.startsWith('image')" />
  </div>
</template>

<script>
import FAudio from './FAudio.vue'
import FVideo from './FVideo.vue'
import { store } from './store'
import FText from './FText.vue'
import { computed } from 'vue'
import FImage from './FImage.vue'

export default {
  components: {
    FAudio,
    FVideo,
    FText,
    FImage
  },
  setup() {
    return {
      store,
      url: computed(() => store.current.url),
      type: computed(() => store.current.type)
    }
  }
}
</script>

<style></style>
