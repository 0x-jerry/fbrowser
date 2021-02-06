<template>
  <video class="w-full h-52 object-center bg-black" :src="file" controls></video>
</template>

<script>
export default {
  props: {
    file: String
  }
}
</script>

<style></style>
