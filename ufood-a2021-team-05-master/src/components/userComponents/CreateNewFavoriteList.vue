<template>
  <div>
    <span>
      <input id="newListName" type="text" class="rounded-lg text-gray-900 h-10 w-full lg:w-96" placeholder=" Enter the list name">
    </span>
    <span>
      <button class="rounded-lg p-1 bg-yellow-600 text-black mt-4 h-10 w-full lg:w-48 lg:ml-3" @click="createList()">Create your favorite list</button>
    </span>
  </div>
</template>

<script>
import { getUser, getUserFavoritesList } from "../../js/usersApi";
import { createFavoriteList, verifyListName } from "../../js/favoriteApi";

export default {
  name: "CreateNewFavoriteList",
  data() {
    return{
      m_userInfo: "",
      m_myListOfFavoriteLists: "",
    }
  },
  mounted(){
    this.getUserInfo();
    this.getFavoriteList();
  },
  methods: {
    async getFavoriteList() {
      const response = await getUserFavoritesList();
      this.m_myListOfFavoriteLists = response.items;
    },
    async getUserInfo() {
      try {
        this.m_userInfo = await getUser();
      } catch (error) {
        console.log(error);
      }
    },
    async createList() {
      try {
        let name = document.getElementById("newListName").value;
        if (name !== "") {
          if (!(await verifyListName(name, this.m_myListOfFavoriteLists))) {
            await createFavoriteList(name, this.m_userInfo.email);
            document.getElementById('newListName').value = "";
            this.$emit('rerenderUserComponent');
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
  }
};
</script>

<style scoped>

</style>
