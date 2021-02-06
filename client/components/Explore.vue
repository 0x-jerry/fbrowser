<template>
  <div class="explore">
    <div class="explore-route">
      路径:
      <span class="current-path text-blue-500">{{ currentPath }}</span>
    </div>
    <div class="explore-files">
      <div class="explore-file text-4xl">
        <f-icon name="image" />
        <f-icon name="video" />
        <f-icon name="music" />
        <f-icon name="folder" />
        <f-icon name="unknown" />
        xxx
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../api'
import FIcon from './FIcon.vue'

export default {
  components: {
    FIcon
  },
  data() {
    return {
      currentPath: '/',
      dir: '/',
      files: []
    }
  },
  mounted() {
    this.getFiles()
  },
  methods: {
    async getFiles() {
      const data = await api.getFiles(this.dir)
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.explore {
  &-route {
    padding: 5px;
  }
}
</style>
