<template>
  <div class="justify-center text-black border-4 border-yellow-500 w-full rounded-xl">
    <link rel="stylesheet"
          href=
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="flex justify-center content-center border-b-2 border-dotted border-yellow-500 boutton-favoris">
      <span class="flex justify-center">
        <input v-on:change="updateFavoriteListName" v-on:keyup.enter="updateFavoriteListName" id="modifyListNameInput" :value="favoriteList.name" type="text" class="text-yellow-600 text-2xl font-bold bg-black input hover:bg-gray-900 input-field">
      </span>
      <div class="boutton-favoris">
        <button class="rounded-lg p-1 bg-yellow-600 text-black m-4" @mouseover="editMode('bg-gray-900')" @mouseleave="editMode('bg-black')" @click="clickEditMode()">
          <i class="fa fa-edit self-center cursor-pointer"></i>
          Edit name
        </button>
        <button class="rounded-lg p-1 bg-yellow-600 text-black m-4" @click="deleteList()">
          <i class="fa fa-trash ml-0.5 mr-1"></i>
          Delete list
        </button>
        <button class="rounded-lg p-1 bg-yellow-600 text-black m-4" @click="openNonFavoriteModal()">
          <i class="fa fa-plus ml-0.5 mr-1"></i>
          Add restaurant
        </button>
      </div>
      <div class="flex">
        <ShowNonFavList :key="nonFavListKey" v-show="m_showNonFavoriteList" :listNonFavorite="m_listRestaurantNotInFavorite" :favoriteList="favoriteList"
         v-on:close="closeNonFavoriModal" v-on:rerenderNonFavListComponent="rerenderNonFavListComponent"></ShowNonFavList>
      </div>
    </div>
    <div>
      <RestListed  :key="rerenderFavListKey" v-on:rerenderFavoriteListComponent="rerenderFavoriteListComponent" v-on:rerenderUserComponent="rerenderUserComponent" :restaurantsList="this.restoList" :isDeleteButton="true" :listFavoriteId="favoriteList.id"></RestListed>
    </div>
  </div>
</template>

<script>
import RestListed from "../searchcomp/RestListed";
import ShowNonFavList from "./ShowNonFavList"
import { updateFavoriteList, verifyListName } from "../../js/favoriteApi.js";
import { deleteFavoriteList } from "../../js/favoriteApi.js"
import { getAllRestaurants } from "../../js/restaurantApi.js"
import { getFavoriteListById} from "../../js/favoriteApi.js";
import { getUserFavoritesList } from "../../js/usersApi";

export default {
  name: "ShowFavoriteList",
  props: ["favoriteList", "restoList"],
  components: {
    RestListed,
    ShowNonFavList,
  },
  data() {
    return {
        rerenderFavListKey: 0,
        nonFavListKey: 0,
        m_showNonFavoriteList: false,
        m_listRestaurantNotInFavorite: [],
    };
  },

  methods: {
    editMode(bg) {
      document.getElementById("modifyListNameInput").className =
        `text-yellow-600 text-2xl font-bold ${bg} input hover:bg-gray-900 input-field`;
    },
    clickEditMode() {
      document.getElementById("modifyListNameInput").focus();
    },
    async updateFavoriteListName() {
      try {
        const name = document.getElementById("modifyListNameInput").value;
        if (name !== "") {
          if (!(await verifyListName(name, (await getUserFavoritesList()).items))) {
            await updateFavoriteList(this.favoriteList.id, name, this.favoriteList.owner.email);
            document.getElementById(this.favoriteList.id).text = name;
          } else {
            alert("This list already exist ... ")
          }
        } else {
          alert("Enter a list name ... ");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteList() {
      try {
        await deleteFavoriteList(this.favoriteList.id);
        document.getElementById("listAllFavoriteLists").value = "default";
        this.$emit('rerenderUserComponent');
      } catch (error) {
        console.log(error);
      }
    },

    rerenderUserComponent: function () {
      this.$emit('rerenderUserComponent');
    },

    rerenderFavoriteListComponent: function () {
      this.$emit('showASpecificFavoriteList');
      this.rerenderFavListKey += 1;
    },

    rerenderNonFavListComponent: function () {
      this.openNonFavoriteModal();
      this.$emit('rerenderShowFavList');
      this.rerenderFavListKey +=1;
      this.nonFavListKey += 1;
    },

    async openNonFavoriteModal() {
      this.m_showNonFavoriteList = true;
      let containsResto = false;
      const fullList = await getAllRestaurants();
      const favoriteList = await getFavoriteListById(this.favoriteList.id);
      for (const resto of fullList.items) {
        containsResto = false;
        for (const restoInFavorite of favoriteList.restaurants) {
          if (restoInFavorite.id === resto.id) {
            containsResto = true;
          }
        }
        if (containsResto === false) {
          this.m_listRestaurantNotInFavorite.push(resto);
        }
      }
    },

    closeNonFavoriModal() {
      this.m_showNonFavoriteList = false;
    },

  }
};
</script>

<style scoped>
@media (max-width: 768px) {
  .boutton-favoris {
    display: flex;
    flex-direction: column;
  }
}

.input {
  text-align: center;
}

.icon {
  padding: 10px;
  min-width: 40px;
}

.input-field {
  width: 100%;
  padding: 10px;
  text-align: center;
}

.input-icons i {
  position: absolute;
}

.input-icons {
  width: 100%;
  margin-bottom: 10px;
}
</style>
