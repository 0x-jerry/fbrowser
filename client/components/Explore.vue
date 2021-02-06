<template>
  <div class="explore">
    <div class="explore-route px-3 py-2 border-gray-500 border-b text-2xl flex">
      <span class="mr-2"> 路径: </span>
      <span class="current-path text-blue-500 flex-1">{{ currentPath }}</span>
      <f-icon v-if="!isRoot" name="goback" @click="goBack"></f-icon>
    </div>
    <div class="explore-files">
      <div class="explore-file text-2xl" v-for="file in files" :key="file.name">
        <div class="flex border-b p-2 border-gray-300" @click="openFile(file)">
          <f-icon v-if="file.folder" class="mr-2" name="folder" />
          <f-icon v-else class="mr-2" :name="calcType(file.type)" />
          <span>{{ file.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { api } from '../api'
import FIcon from './FIcon.vue'
import { store } from './store'
import path from 'path'
import { IFile } from '../../typings/common'

export default {
  components: {
    FIcon
  },
  data() {
    return {
      store,
      files: []
    }
  },
  computed: {
    currentPath() {
      return path.parse(store.dir).name
    },
    isRoot() {
      return store.dir === '/'
    }
  },
  mounted() {
    this.getFiles()
  },
  methods: {
    async getFiles() {
      const data = await api.getFiles(store.dir)
      this.files = data.files
    },
    calcType(type: string) {
      return type.split('/').shift()
    },
    async openFile(file: IFile) {
      if (file.folder) {
        this.openFolder(file.name)
      }
    },
    async openFolder(name: string) {
      store.dir = path.join(store.dir, name)
      this.getFiles()
    },
    async goBack() {
      store.dir = path.parse(store.dir).dir

      this.getFiles()
    }
  }
}
</script>

<style lang="less">
.explore {
  height: 100vh;

  &-files {
    height: calc(100% - 50px);
    overflow-y: auto;
  }
}
</style>
