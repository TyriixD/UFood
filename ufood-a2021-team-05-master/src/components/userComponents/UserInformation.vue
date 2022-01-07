<template>
 <div class="flex flex-wrap justify-center md:col-span-1 mt-5 md:mb-10">
    <div v-if="hash" class="image-cropper mt-7">
      <img :src="`https://www.gravatar.com/avatar/${hash}?d=identicon`" alt="" class="rounded">
    </div>
    <div class="text-lg md:text-2xl text-yellow-600 font-medium my-10 mx-1 md:col-span-3 h-48 shadow-xl p-4 space-y-2 w-screen md:w-8/12">
        <div class="flex text-black">
          <span class=" text-sm  bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 whitespace-no-wrap w-2/6">
              Name :
              </span>
          <input class=" px-4  cursor-default border-gray-300 focus:outline-none rounded-md shadow-sm -ml-1 w-4/6" type="text" :value="`${userInfo.name } `" readonly/>
        </div>
      <div class="flex text-black">
              <span class="text-sm  bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 whitespace-no-wrap w-2/6">
                Email:
              </span>
        <input class=" px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md shadow-sm -ml-1 w-4/6" type="text" :value="userInfo.email" readonly/>
      </div>
      <div class="flex text-black">
              <span class="text-sm bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 whitespace-no-wrap w-2/6">
                Rating:
              </span>
        <input class="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md shadow-sm -ml-1 w-4/6" type="text" :value="`${userInfo.rating}`" readonly/>
      </div>
    </div>
  </div>
</template>
<script>
const md5 = require('md5');
export default {
  props: ['userInfo', 'hash'],
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style scoped>
.image-cropper {
  width: 120px;
  height: 120px;
  position: relative;
  border-radius: 50%;
}

img {
  display: inline;
  height: 100%;
  width: auto;
  margin-top: 36px;
}
</style>
