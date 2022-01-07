<template >
  <div class="">
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white flex flex-col border-2 border-yellow-600">
        <header class="flex flex-col p-3.5 border-b-2 border-yellow-600 justify-between bg-black text-yellow-600">
          <slot name="header"> Add favorites in {{ favoriteList.name }} </slot>
        </header>
        <section class="scroll relative p-3.5 text-black">
          <slot name="body justify-center">
            <div class = "flex justify-center text-black border-2 border-black" id ="listeFavoris">
              <RestListed :restaurantsList="listNonFavorite" :listFavoriteId="favoriteList.id" :hideFavoriteModal="true"
              v-on:rerenderNonFavListComponent="rerenderNonFavListComponent"></RestListed>
            </div>
          </slot>
        </section>
        <footer class="flex flex-col p-3.5 border-t-2 border-yellow-600 justify-end space-y-1 bg-black">
          <slot name="footer">
            <button type="button" class="bg-red-600 text-gray-900 rounded-lg" @click="close()"> Close </button>
          </slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import RestListed from "../searchcomp/RestListed";
export default {

  components: {
    RestListed,
  },
  props: ['listNonFavorite', 'favoriteList'],

  methods: {
    close() {
      this.$emit('close')
    },

    rerenderNonFavListComponent: function () {
      this.$emit('rerenderNonFavListComponent');
    },
  },

};
</script>

<style scoped>
section.scroll {
  margin:4px, 4px;
  padding:4px;
  background-color: black;
  width: 43vw;
  height: 43vw;
  overflow-x: hidden;
  overflow-y: auto;
  text-align:justify;
}
@media (min-width: 1440px) {
  section.scroll {
    margin: 0px, 0px;
    padding: 0px;
    width: 50vw;
    height: 30vw;
  }
}

@media (max-width: 768px) {
  section.scroll {
    margin: 0px, 0px;
    padding: 0px;
    width: 100vw;
    height: 100vw;
  }
}

@media (max-width: 731px) {
  section.scroll {
    margin: 0px, 0px;
    padding: 0px;
    width: 50vw;
    height: 40vw;
  }
}

@media (max-width: 411px) {
  section.scroll {
    margin: 0px, 0px;
    padding: 0px;
    width: 100vw;
    height: 100vw;
  }
}
</style>
