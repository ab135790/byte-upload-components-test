<script lang="ts">
import { defineComponent } from 'vue';
import { inject } from 'vue';
export default defineComponent({
  // const getCurrentInstance = () => {

  // }
  setup() {
    console.log(inject('test'))
  }

})

</script>

<template>
  <!-- <RouterView /> -->
</template>

<style scoped>

</style>
