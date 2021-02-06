<template>
  <div class="explore">
    <div class="explore-route px-3 py-2 border-gray-500 border-b text-xl flex">
      <span class="mr-2"> 路径: </span>
      <div class="current-path text-blue-500 flex-1 overflow-ellipsis">{{ currentPath }}</div>
      <f-icon v-if="!isRoot" name="goback" @click="goBack"></f-icon>
    </div>
    <div class="explore-files">
      <div class="explore-file text-xl" v-for="file in data.files" :key="file.name">
        <div class="flex border-b p-2 border-gray-300" @click="openFile(file)">
          <f-icon v-if="file.folder" class="mr-2" name="folder" />
          <f-icon v-else class="mr-2" :name="calcType(file.type)" />
          <span class="truncate">{{ file.name }}</span>
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
import { IFile } from '../../../typings/common'
import { computed, onMounted, reactive } from 'vue'

const calcType = (type: string) => type.split('/').shift()

export default {
  components: {
    FIcon
  },
  setup() {
    const data = reactive({
      files: []
    })

    const updateFiles = async () => {
      const res = await api.getFiles(store.dir)
      data.files = res.files
    }

    onMounted(() => updateFiles())

    const currentPath = computed(() => path.parse(store.dir).name)
    const isRoot = computed(() => store.dir === '/')

    const openFolder = (name: string) => {
      store.dir = path.join(store.dir, name)
      updateFiles()
    }

    return {
      data,
      currentPath,
      isRoot,
      calcType,
      goBack() {
        store.dir = path.parse(store.dir).dir
        updateFiles()
      },
      openFile(file: IFile) {
        if (file.folder) {
          openFolder(file.name)
        } else {
          store.setSrc(file)
        }
      }
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
