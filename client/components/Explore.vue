<template>
  <div class="explore">
    <div class="explore-route px-3 py-2 border-gray-300 border-b">
      路径:
      <span class="current-path text-blue-500">{{ currentPath }}</span>
    </div>
    <div class="explore-files p-2">
      <div class="explore-file text-2xl" v-for="file in files" :key="file.name">
        <f-icon v-if="file.folder" class="mr-2" name="folder" @click="openFolder(file.name)" />
        <f-icon v-else class="mr-2" :name="calcType(file.type)" />
        <span>{{ file.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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
      this.files = data.files
    },
    calcType(type: string) {
      return type.split('/').shift()
    },
    async openFolder(name: string) {
      this.dir = this.dir + '/' + name
      const data = await api.getFiles(this.dir)
      this.files = data.files
    }
  }
}
</script>

<style lang="less" scoped>
.explore {
  &-route {
  }
}
</style>
