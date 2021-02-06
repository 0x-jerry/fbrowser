<template>
  <i :class="['iconfont', iconClass, 'iconfile-' + nameClass]"> </i>
</template>

<script lang="ts">
const colorMap = {
  image: 'text-red-500',
  folder: 'text-yellow-500',
  video: 'text-purple-500',
  audio: 'text-green-500',
  unknown: 'text-gray-500'
}

export default {
  props: {
    name: String
  },
  computed: {
    nameClass() {
      if (colorMap[this.$props.name]) {
        return this.$props.name
      }

      return 'unknown'
    },
    iconClass() {
      return colorMap[this.nameClass]
    }
  }
}
</script>

<style>
.iconfont {
  /* @apply text-purple-500 text-gray-500; */
}
</style>
