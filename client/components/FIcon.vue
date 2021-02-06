<template>
  <i :class="['iconfont', iconClass, 'iconfile-' + name]"> </i>
</template>

<script lang="ts">
const colorMap = {
  image: 'text-red-500',
  folder: 'text-yellow-500',
  video: 'text-purple-500',
  music: 'text-green-500',
  unknown: 'text-gray-500'
}

export default {
  props: {
    name: String
  },
  computed: {
    iconClass() {
      return colorMap[this.$props.name]
    }
  }
}
</script>

<style>
.iconfont {
  /* @apply text-purple-500 text-gray-500; */
}
</style>
