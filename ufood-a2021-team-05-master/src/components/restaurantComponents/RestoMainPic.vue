<template>
  <div v-if="resto.pictures">
    <div class="mt-4">
      <div>
        <img id="mainRestoPic" class=" object-contain lg:h-96 md:h-96 w-full flex sm:w-full justify-center " :src="resto.pictures[currentIndex]">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['resto'],
  data(){
    return {
      currentIndex: 0,
    }
  },

}
</script>
<style scoped></style>