<template>
  <div id="" class="flex flex-wrap justify-center">
    <div v-for="(item, i) in restaurantsList" :key="item.id + i" class="w-96 p-4">
      <RestCardSolo  :key="rerenderRestoCardKey" :favoriteList="favoriteList" v-on:rerenderFavoriteListComponent="rerenderFavoriteListComponent" v-on:rerenderRestCardSolo="rerenderRestCardSolo"
       v-on:rerenderUserComponent="rerenderUserComponent" :resto="item" :isDeleteButton="isDeleteButton" 
       :listFavoriteId="listFavoriteId" :hideFavoriteModal="hideFavoriteModal" v-on:rerenderNonFavListComponent="rerenderNonFavListComponent"></RestCardSolo>
    </div>
  </div>
</template>

<script>
import RestCardSolo from "./RestCardSolo"
import { getUserFavoritesList } from "../../js/usersApi.js"

export default {
  components: {
    RestCardSolo
  },
  props: ['restaurantsList', 'isDeleteButton', 'listFavoriteId', 'hideFavoriteModal'],
  data (){
    return{
        rerenderRestoCardKey: 0,
        favoriteList:""
    }
  },
  
  mounted(){
    this.loadFavoritesListFromUser();
  },
  methods: {
    
    async loadFavoritesListFromUser() {
      try{
        this.favoriteList = await getUserFavoritesList();
        this.rerenderRestoCardKey +=1
      }
      catch (error) {
        console.log(error)
      }
    },

     rerenderFavoriteListComponent: function () {
      this.$emit('rerenderFavoriteListComponent');
    },

    rerenderUserComponent: function () {
      this.$emit('rerenderUserComponent');
    },

    rerenderRestCardSolo: function () {
     this.rerenderRestoCardKey +=1
    },

    rerenderNonFavListComponent: function () {
      this.$emit('rerenderNonFavListComponent');
    },
  }
}
</script>
<style scoped></style>