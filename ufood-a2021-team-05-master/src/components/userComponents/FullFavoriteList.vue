<template>
  <div class="w-screen">
    <div class="flex justify-center">
      <CreateNewFavoriteList :key="rerenderShowFavListKey" v-on:rerenderUserComponent="rerenderUserComponent"></CreateNewFavoriteList>
    </div>
    <div class="flex text-2xl text-yellow-600 font-medium m-6 justify-center items-center">
      Choose a Favorite List you would like to view
    </div>
    <div class="justify-center" v-if="this.m_myListOfFavoriteLists">
      <div class="ml-1 flex justify-center text-black" id="listeFavoris">
        <select v-on:change="showASpecificFavoriteList()" class="text-black rounded-lg h-10 w-4/5 lg:w-96" id="listAllFavoriteLists">
          <option value="default">Choose a favorite list</option>
          <option class="justify-center" :id="favoriteListItem.id" v-for="favoriteListItem in this.m_myListOfFavoriteLists.items" :key="favoriteListItem.id" :value="favoriteListItem.id">{{favoriteListItem.name}}</option>
        </select>
      </div>
      <div class="w-screen items-center justify-center bg-teal-lightest font-sans">
        <div class="bg-black rounded shadow mt-3 w-screen justify-center">
          <ShowFavoriteList :key="rerenderShowFavListKey" v-on:showASpecificFavoriteList="showASpecificFavoriteList"
          v-on:rerenderUserComponent="rerenderUserComponent" v-show="showFavoriteList"
          :favoriteList="this.myParticularFavoriteList" :restoList="this.restaurantsInfo"
          v-on:rerenderShowFavList="rerenderShowFavList"  ></ShowFavoriteList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShowFavoriteList from "./ShowFavoriteList";
import CreateNewFavoriteList from "./CreateNewFavoriteList";
import { getUserFavoritesList } from "../../js/usersApi.js"
import { getFavoriteListById } from "../../js/favoriteApi.js"
import { getRestaurantById } from "../../js/restaurantApi.js"

export default {
  props: ["fullFavoritesList"],
  components: {
    ShowFavoriteList,
    CreateNewFavoriteList,
  },
  data() {
    return {
      showFavoriteList: false,
      m_myListOfFavoriteLists:[],
      m_restoListId: "",
      myParticularFavoriteList:[],
      restaurantsInfo:[],
      favoriteListSelected: "",
      rerenderShowFavListKey:0,

    }
  },
  mounted(){
    this.loadFavoritesListFromUser();
  },
  methods: {
    async loadFavoritesListFromUser() {
      try {
        this.m_myListOfFavoriteLists = await getUserFavoritesList();
      } catch (error) {
        console.log(error)
      }
    },
    async showASpecificFavoriteList() {
      try {
        var listeFavoriteId = document.getElementById("listAllFavoriteLists");
        var value = listeFavoriteId.options[listeFavoriteId.selectedIndex].value;
        if (value !== "") {
          this.m_restoListId = value;
          this.myParticularFavoriteList = await getFavoriteListById (this.m_restoListId);
          this.restaurantsInfo = [];
          for (const element of this.myParticularFavoriteList.restaurants) {
            const item = await getRestaurantById(element.id);
            this.restaurantsInfo.push(item);
          }
          this.showFavoriteList = true;
        }
      } catch (error) {
        console.log(error)
      }
    },

    rerenderUserComponent: function () {
      this.$emit('rerenderUserComponent');
    },

    rerenderShowFavList: function () {
      this.$emit('rerenderShowFavList');
      this.showASpecificFavoriteList()
      this.rerenderShowFavListKey += 1;
    },

  }
};
</script>
<style scoped></style>
