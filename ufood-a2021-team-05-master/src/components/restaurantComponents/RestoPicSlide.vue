<template >
  <div class="m-4" v-if="resto.pictures">
    <div class="lg:flex md:flex justify-center border-2 border-yellow-500">
      <div class="pt-2 pb-2 m-2" v-for="item in resto.pictures" v-bind:key="item">
        <button v-on:click="showImage(item)">
          <img class="object-contain lg:h-32 md:h-32 sm:h-10 sm:w-full justify-center" :src="item">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['resto'],
  methods: {
    showImage: function (pictureSource) {
      document.getElementById("mainRestoPic").src = pictureSource;
    },
  }
}
</script>
<style scoped></style>
