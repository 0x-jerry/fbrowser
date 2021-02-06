<template>
  <video class="w-full" :src="file" controls></video>
</template>

<script>
export default {
  props: {
    file: String
  }
}
</script>

<style></style>
