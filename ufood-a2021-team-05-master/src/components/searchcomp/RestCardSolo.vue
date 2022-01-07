<template>
  <div class="fullCard bg-white drop-shadow-lg-white transition duration-1000 ease-in-out hover:bg-yellow-600 p-6 rounded-lg" >
      <div v-if="resto.genres">
      <router-link  :to='"/restaurant/" + resto.id'>
        <div class="flex justify-center h-20">
          <img class="rounded-lg" :src="resto.pictures[Math.floor(Math.random() * 10)]"  alt="Image Size 720x400">
        </div>
        <h3 class="text-indigo-500 text-xs font-medium">{{resto.genres[0]}}</h3>
        <h3 v-if="resto.genres[1] !== ''" class="text-indigo-500 text-xs font-small">{{resto.genres[1]}}</h3>
        <h2 class="text-lg text-gray-900 font-medium mb-4">{{resto.name.substring(0,33)}}</h2>
        <p class="h-14">{{resto.address}}</p>
      </router-link>
      <button class="rounded-lg p-1 bg-black text-yellow-600" @click="openVisitModal()">Register visit</button>
      <button v-if="isDeleteButton" class=" ml-3 rounded-lg p-1 bg-black text-yellow-600 w-bouton" :class="isPress? 'cursor-wait':'cursor-pointer'" v-on:click="deleteFromFavorites()">
        <i class="" aria-hidden="true"></i> {{ textBouttonDelete }}
      </button>
      <button v-else class=" ml-3 rounded-lg bg-black p-1 text-yellow-600 w-bouton" :class="isPress? 'cursor-wait':'cursor-pointer'" v-on:click="openFavoriteModal">
        <i class="" aria-hidden="true"></i> {{ textBouttonFavori }}
      </button>
      <VisitModal v-show="showVisitModal" :restoItem="resto" :editMode="true" @close="closeVisitModal()"/>
      <AddFavoriteModal  v-show="showFavoriteModal" :favoriteList="favoriteList" :resto="resto"  v-on:close="closeFavoriteModal" v-on:rerenderRestCardSolo="rerenderRestCardSolo"/>
    </div>
  </div>
</template>

<script>
import VisitModal from '@/components/VisitModal.vue';
import AddFavoriteModal from '@/components/AddFavoriteModal.vue';
import { removeRestaurantFromFavorite } from "../../js/favoriteApi";
import { addRestaurantToFavorite } from "../../js/favoriteApi.js"
import {isTokenValid } from "../../js/logApi";


export default {
  props: ['resto','isDeleteButton', 'listFavoriteId', 'hideFavoriteModal', "favoriteList"],
  components:{
    AddFavoriteModal,
    VisitModal,
  },
  data(){
    return{
      showVisitModal: false,
      showFavoriteModal: false,
      textBouttonFavori: "Add to favorites",
      textBouttonDelete: "Delete from favorites",
      isPress: false
    }
  },

  methods: {
    async deleteFromFavorites() {
      try {
        if (!this.isPress) {
          this.isPress = true;
          this.textBouttonDelete = "Please  wait ..."
          await removeRestaurantFromFavorite(this.listFavoriteId, this.resto.id);
          this.$emit('rerenderFavoriteListComponent');
        }
      } catch (error) {
        console.log(error);
      }
    },
    async openVisitModal() {
      const userlog = await isTokenValid();
      if (userlog) {
        this.showVisitModal = true;
      }
      else {
        window.location.href = "/#/login/";
      }
    },
    closeVisitModal() {
      this.showVisitModal = false;
    },
    async openFavoriteModal() {
      if (!this.isPress) {
        this.isPress = true;
        if (this.hideFavoriteModal === true) {
          try {
            this.textBouttonFavori = "Please wait ..."
            await addRestaurantToFavorite(this.listFavoriteId, this.resto.id)
            this.$emit('rerenderNonFavListComponent');
          } catch (error) {
            console.log(error)
          }
        } else {
          const userlog = await isTokenValid();
          if (userlog) {
            this.showFavoriteModal = true;
          } else {
            window.location.href = "/#/login/";
          }
        }
      }
    },
    closeFavoriteModal() {
      this.isPress = false;
      this.showFavoriteModal = false;
    },
    rerenderRestCardSolo: function () {
      this.$emit('rerenderRestCardSolo');
    },
  }
}
</script>

<style scoped>
.fullCard{
  height: 280px;
}
.drop-shadow-lg-white {
  box-shadow: 5px 2px 2px rgb(231, 174, 68);
  transition: box-shadow 0.3s ease-in-out;
  opacity: 0.8;
}
.drop-shadow-lg-white:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  opacity: 1;
  width: 101%;
  height: 285px;
}

.w-bouton {
  width: 180px;
}
</style>
