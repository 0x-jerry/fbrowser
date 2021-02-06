<template>
  <i :class="['iconfont', 'iconfile-' + name]"> </i>
</template>

<script lang="ts">
export default {
  props: {
    name: String
  }
}
</script>

<style></style>
