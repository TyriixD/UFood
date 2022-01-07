<template>
  <div v-if="resto.genres"> 
    <div class="flex justify-center">
      <div id="Column2">
        <div id="name" class="text-2xl m-4">
          <b>{{resto.name}}</b>
        </div>
        <span class="pt-2 pb-2 m-2" v-for="item in resto.genres" v-bind:key="item">
          <button id="genre" class="px-4 py-2 cursor-text text-white bg-blue-600 rounded-md">{{item}}
          </button>
        </span>
        <div id="fiveStars" class="mt-4">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"/>
          <span v-for="item in Math.round(resto.price_range)" v-bind:key="item">
            <i class="fas fa-star fa-sm text-yellow-500 mr-1"></i>
          </span>
          <span v-for="item in Math.round(5-resto.price_range)" v-bind:key="item + 5">
            <i class="fas fa-star fa-sm text-white-500 mr-1"></i>
          </span>
        </div>
        <div class="pt-2 pb-2 mt-4" >
          <button id="price" class="px-4 py-2 cursor-text text-white bg-yellow-600 rounded-md">
            <span v-for="item in resto.price_range" v-bind:key="item">$</span>
          </button>
        </div>
        <div id="Address" class="pt-2 pb-2 mt-4">
          Address<br>
          {{ resto.address }}<br />
        </div>
        <div id="telephone" class="pt-2 pb-2 mt-4">
          Phone<br>
          {{ resto.tel }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ['resto']
}
</script>
<style scoped></style>