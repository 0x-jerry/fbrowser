<template>
  <video class="w-full h-52 object-center bg-black" :src="file" controls autoplay></video>
</template>

<script>
export default {
  props: {
    file: String
  }
}
</script>

<style></style>
