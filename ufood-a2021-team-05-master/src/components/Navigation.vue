<template>
  <nav class="sticky sm:relative md:sticky top-0 z-50 bg-black">
    <link rel="stylesheet"
          href=
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="flex flex-col pb-3 w-full text-xs sm:text-base">
      <div class="flex justify-between order-3 sm:order-1 flex-col-reverse sm:flex-row">
        <div class="flex justify-center pb-2 pt-2 sm:pt-0 sm:pb-0">
          <ul class="flex">
            <li class="transform hover:bg-yellow-600 rounded-xl scale-90 transition duration-300">
              <router-link class="inline-block border border-yellow-600 rounded-xl px-3 bg-transparent text-white"  to="/">
                <i class="fa fa-home mr-1"></i>
                Home
              </router-link>
            </li>
          </ul>
        </div>
        <div>
          <ul class="flex justify-between">
            <div>
              <li v-if="this.$root.isLoggedIn" class="inline-block py-0 bg-transparent text-white">
                Welcome <b>{{this.$root.name}}</b>
              </li>
              <li v-else class="inline-block py-0 bg-transparent text-white">
                Welcome <b>Please log in</b>
              </li>
            </div>
            <div class="flex">
              <li v-if="this.$root.isLoggedIn" class="transform hover:bg-gray-700 rounded-xl scale-90 transition duration-300">
                <button class="inline-block border border-gray-400 rounded-xl scale-90 px-4 bg-transparent text-white" @click="logout()">
                  <i class="fa fa-sign-out mr-1"></i>
                  Logout
                </button>
              </li>
              <li v-else class="transform hover:bg-gray-700 rounded-xl scale-90 transition duration-300">
                <router-link class="inline-block border border-gray-400 rounded-xl scale-90 px-4 bg-transparent text-white" to="/login">
                  <i class="fa fa-sign-in mr-1"></i>
                  Login
                </router-link>
              </li>
              <li v-if="this.$root.isLoggedIn" class="transform hover:bg-gray-700 rounded-xl scale-90 transition duration-300">
                <router-link class="inline-block border border-gray-400 rounded-xl px-4 bg-transparent text-white"  to="/user">
                  <i class="fa fa-user mr-1"></i>
                  User Profile
                </router-link>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div class="flex pl-0 pb-1 order-1 sm:order-2">
        <Head3js></Head3js>
      </div>
      <hr class="solid border-yellow-600 relative top-2 order-4">
    </div>
  </nav>
</template>

<script>
import Head3js from "./head/Head3js"

export default {
  components: {
    Head3js
  },
  methods: {
    async logout(){
      await this.globalLogout();
    },
  }
}
</script>
<style scoped></style>
