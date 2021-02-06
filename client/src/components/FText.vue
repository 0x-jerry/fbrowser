<template>
  <pre class="text-black overflow-auto w-full h-full p-2">{{ data.content }}</pre>
</template>

<script>
import axios from 'axios'
import { reactive, watchEffect } from 'vue'
export default {
  props: {
    file: String
  },
  setup(props) {
    const data = reactive({
      content: ''
    })

    watchEffect(async () => {
      const res = await axios.get(props.file)
      data.content = res.data
    })

    return {
      data
    }
  }
}
</script>

<style></style>
