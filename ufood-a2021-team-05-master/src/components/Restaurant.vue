<template>
  <div v-if="m_restoInfo">
    <div class="flex-col w-full p-5">
      <div class="flex">
        <div>
          <VisitModal v-show="showVisitModal" :restoItem="this.m_restoInfo" :editMode="true" v-on:close="closeVisitModal"/>
          <button class="rounded-lg p-1 bg-yellow-600 text-black" v-on:click="openVisitModal" >Register visit</button>
        </div>
        <div class="ml-4">
          <AddFavoriteModal :key="RestaurantFavModalKey" :favoriteList="favoriteList" v-show="showFavoriteModal" :resto="this.m_restoInfo"  v-on:close="closeFavoriteModal" v-on:rerenderRestCardSolo="rerenderFavoriteModal"/>
          <button class="rounded-lg p-1 bg-yellow-600 text-black" v-on:click="openFavoriteModal">
            <i class="fas fa-heart" aria-hidden="true" ></i> Ajouter aux favoris
          </button>
        </div>
      </div> 
      <div class="relative lg:flex md:flex w-full justify-between space-x-6"> 
        <div class="lg:w-1/2 md:w-1/2" >
          <RestoMainPic :resto="m_restoInfo"></RestoMainPic>
        </div>
        <div>
          <RestoInformation :resto="m_restoInfo"></RestoInformation>
        </div>
        <div>
          <RestoSchedule :resto="m_restoInfo"></RestoSchedule>
        </div>
      </div>
      <RestoPicSlide :resto="m_restoInfo"></RestoPicSlide>
      <div>
        <RestoLocation :resto="m_restoInfo"></RestoLocation>
      </div>
    </div>
  </div>
</template>
<script>
import RestoMainPic from "./restaurantComponents/RestoMainPic"
import RestoPicSlide from "./restaurantComponents/RestoPicSlide"
import RestoInformation from "./restaurantComponents/RestoInformation"
import RestoSchedule from "./restaurantComponents/RestoSchedule"
import RestoLocation from "./restaurantComponents/RestoLocation"
import { getRestaurantById } from "../js/restaurantApi.js" 
import { getUserFavoritesList } from "../js/usersApi.js"
import VisitModal from '@/components/VisitModal.vue';
import AddFavoriteModal from '@/components/AddFavoriteModal.vue';

export default {
  components: {
    RestoMainPic,
    RestoPicSlide,
    RestoInformation,
    RestoSchedule,
    RestoLocation,
    AddFavoriteModal,
    VisitModal
  },
  data(){
    return{
      m_restoInfo: "",
      showVisitModal: false,
      showFavoriteModal: false,
      RestaurantFavModalKey: 0,
      favoriteList: ""
    }
  },
  mounted(){
    this.getRestoInfo([this.$route.params.id]);
    this.loadFavoritesListFromUser();
  },
  methods: {
    async getRestoInfo(id){
      try{
        this.m_restoInfo = await getRestaurantById(id);
      } catch (error){
        console.log(error);
      }
    },

    async loadFavoritesListFromUser() {
      try{
        this.favoriteList = await getUserFavoritesList();
        this.rerenderFavoriteModal();
      }
      catch (error) {
        console.log(error)
      }
    },

    openVisitModal() {
      if (this.$root.isLoggedIn) {
        this.showVisitModal = true;
      }
      else {
        window.location.href = "/#/login/";
      } 
    },
    
    closeVisitModal() {
      this.showVisitModal = false;
    },
    openFavoriteModal() {
      if (this.$root.isLoggedIn) {
      this.showFavoriteModal = true;
      }
      else {
        window.location.href = "/#/login/";
      }
    },
    closeFavoriteModal() {
      this.showFavoriteModal = false;
    },

    rerenderFavoriteModal: function () {
      this.RestaurantFavModalKey += 1;
    },
  }
}
</script>
<style scoped></style>