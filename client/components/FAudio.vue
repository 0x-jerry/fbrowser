<template>
  <audio class="w-full" :src="file" controls></audio>
</template>

<script>
export default {
  props: {
    file: String
  }
}
</script>

<style></style>
