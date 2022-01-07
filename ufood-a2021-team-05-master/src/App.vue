<template>
  <div id="app">
    <nav-menu></nav-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  name: "app",
  components: {
    "nav-menu": Navigation,
  },
  async created() {
    await this.globalLogin();
  },
};
</script>

<style>
body{
  background-color:black;
  color: white;
  max-width: 1671px;
}
</style>