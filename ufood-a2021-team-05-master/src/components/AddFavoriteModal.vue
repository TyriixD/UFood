<template >
  <div v-if="this.m_favoriteLists">
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white flex flex-col border-2 border-yellow-600">
        <header class="flex flex-col p-3.5 border-b-2 border-yellow-600 justify-between bg-black text-yellow-600">
          <slot name="header"> Add "{{resto.name}}" to favorite list</slot>
        </header>
        <section class="relative p-3.5 text-black">
          <slot name="body justify-center">
            <div class="flex justify-center border-2 border-yellow-600" id ="listeFavoris">
              <select class="text-black rounded-lg w-full" v-bind:id="resto.id">
                <option class="justify-center " v-for="favoriteListItem in m_favoriteLists" :key="favoriteListItem.id" :value="favoriteListItem.id">{{favoriteListItem.name}}</option>
              </select>
            </div>
          </slot>
        </section>
        <footer class="flex flex-col p-3.5 border-t-2 border-yellow-600 justify-end space-y-1 bg-black">
          <slot name="footer">
            <button type="button" class="bg-yellow-500 text-gray-900 rounded-lg" @click="addFavoriteRestaurant">
              <i class="fa fa-heart" aria-hidden="true"/> Add to favorite
            </button>
            <button type="button" class="bg-red-600 text-gray-900 rounded-lg" @click="close"> Cancel </button>
          </slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { addRestaurantToFavorite } from "../js/favoriteApi.js"


export default {
  name: 'ModalAjoutFavori',
  props: ['resto', 'favoriteList'],
  data(){
    return{
      m_favoriteLists: "",
    }
  },
  mounted(){
    this.loadFavoritesListFromUser();
  },
  methods: {

    async loadFavoritesListFromUser() {
      try {
        let completeList = this.favoriteList;
        this.m_favoriteLists = [];
        if (completeList){
          for (let element of completeList.items) {
            let inList = false
              for (let item of element.restaurants) {
                if(this.resto.id === item.id){
                  inList = true;
                }
              }
              if(inList === false){
                this.m_favoriteLists.push(element);
              }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    close() {
      this.$emit('close');
    },

    async addFavoriteRestaurant() {
      try {
        const listeFavoriteId = document.getElementById(this.resto.id).value
        if (listeFavoriteId != ""){
          await addRestaurantToFavorite(listeFavoriteId, this.resto.id)
        }
        this.$emit('rerenderRestCardSolo');
        this.$emit('close');
      } catch (error) {
        console.log(error)
      }
    },
  }
}
</script>
<style scoped></style>
