<template>
  <div class="app flex">
    <div class="tree">
      <div class="tree-header">
        <div class="header">{{dir}}</div>
      </div>
      <div class="tree-items">
        <div v-if="dir !== '/'" class="tree-item" @click="back()">..</div>
        <div class="tree-item" v-for="o in files" @click="show(o)">
          {{o.isFolder ? '*': ' '}}
          {{o.name}}
        </div>
      </div>
    </div>
    <div class="right">
      <video v-if="currentFileType === 'video'" :src="currentFile" controls width="800"></video>
      <img v-else-if="currentFileType === 'image'" :src="currentFile" />
      <div v-else class="empty">请点击左侧文件打开</div>
    </div>
  </div>
</template>

<script>
import { axios } from './api'
import { config } from './config'

export default {
  data() {
    return {
      dir: '/',
      files: [],
      currentFile: '',
      currentFileType: ''
    }
  },
  mounted() {
    this.getDir()
  },
  methods: {
    async getDir(dir = '/') {
      const r = await axios.get('/api/query', { params: { dir } })
      const data = r.data
      this.files = data.files
    },
    show(file) {
      const base = config.isDev ? 'http://localhost:3000/assets' : '/assets'

      if (file.isFolder) {
        this.enter(file.name)
        return
      }

      const sep = this.dir.endsWith('/') ? '' : '/'
      this.currentFile = base + this.dir + sep + file.name
      const ext = file.name.split('.').pop()

      if (/^(mp4)$/.test(ext)) {
        this.currentFileType = 'video'
      } else if (/^(png|jpeg|jpg)$/.test(ext)) {
        this.currentFileType = 'image'
      }
    },
    enter(dir) {
      const dirs = this.dir.split('/')
      dirs.push(dir)
      this.dir = dirs.join('/').substr(1) || '/'
      this.getDir(this.dir)
    },
    back() {
      const dirs = this.dir.split('/')
      dirs.pop()
      this.dir = dirs.join('/').substr(1) || '/'
      this.getDir(this.dir)
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.flex {
  display: flex;
}

.tree {
  min-width: 200px;
}

.tree-header {
  border: 1px solid gray;
  padding: 2px 5px;
}

.tree-items {
  border: 1px solid grey;
  border-top: 0px;
}

.tree-item {
  padding: 2px 5px;
}

.tree-item + .tree-item {
  border-top: 1px solid grey;
}
</style>