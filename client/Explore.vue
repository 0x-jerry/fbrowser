<template>
  <div class="explore">
    <div class="explore-route">
      路径:
      <span class="current-path">{{ currentPath }}</span>
    </div>
    <div class="explore-files">
      <div class="explore-file">
        <f-icon name="image" />
        xxx
      </div>
    </div>
  </div>
</template>

<script>
import FIcon from './components/FIcon.vue'

export default {
  components: {
    FIcon
  },
  data() {
    return {
      currentPath: '/'
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
.current-path {
  color: #006eff;
}
</style>
