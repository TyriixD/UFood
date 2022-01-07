<template>
  <div>
    <nav class="bg-black shadow" id="app">
      <div class="container px-6 py-3 mx-auto">
        <div class="md:flex justify-between items-center">
          <div class="flex justify-between items-center">
            <a href="#" class="text-gray-800 text-xl font-bold hover:text-gray-700 md:text-2xl"></a>
            <div class="md:hidden">
              <button type="button" class="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none" @click="isOpen = !isOpen">
                <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="flex-col mt-3 md:flex-row md:mt-0 md:flex items-start" :class="isOpen? 'flex' : 'hidden'">
            <button @click="turnAllFalse(true); showProfileInformations = !showProfileInformations"
               class="mb-2 text-sm hover:text-white md:mx-4 mt-1"
               :class="showProfileInformations? 'text-white' : 'text-yellow-600'">Profile</button>
            <button @click="turnAllFalse(true); showFavoriteList = ! showFavoriteList"
               class="mb-2 text-sm hover:text-white md:mx-4 mt-1"
               :class="showFavoriteList? 'text-white' : 'text-yellow-600'">Favorites</button>
            <button @click="turnAllFalse(true); showAllVisitsList = !showAllVisitsList; componentKey += 1"
               class="mb-2 text-sm hover:text-white md:mx-4 mt-1"
               :class="showAllVisitsList? 'text-white' : 'text-yellow-600'">Visits</button>
            <button @click="turnAllFalse(true); showFollowersList = !showFollowersList; componentKeyFollow += 1"
               class="mb-2 text-sm hover:text-white md:mx-4 mt-1"
               :class="showFollowersList? 'text-white' : 'text-yellow-600'">Followers</button>
            <button @click="turnAllFalse(true); showFollowingList = !showFollowingList; componentKeyFollow += 1"
                    class="mb-2 text-sm hover:text-white md:mx-4 mt-1"
                    :class="showFollowingList? 'text-white' : 'text-yellow-600'">Following</button>
            <SearchBarUser v-if="m_userInfo.id" class="mb-2 justify-self-start mobile-search-first" :key="componentKeySearchBar"
              :p_userInfo="m_userInfo" v-on:turnAllFalse="turnAllFalse" v-on:rerender="getUserInfo" v-on:showUser="showUser"></SearchBarUser>
          </div>
        </div>
      </div>
    </nav>
    <div>
      <ShowFollowers v-show="showFollowingList" :p_userInfo="m_userInfo" :p_yourInfo="m_userInfo" p_nameList="following"
        v-on:rerenderFollowList="rerenderFollowList" v-on:showUser="showUser" :key="componentKeyFollow"></ShowFollowers>
    </div>
    <div>
      <ShowFollowers v-show="showFollowersList" :p_userInfo="m_userInfo" :p_yourInfo="m_userInfo" p_nameList="follower"
        v-on:rerenderFollowList="rerenderFollowList" v-on:showUser="showUser" :key="componentKeyFollow" ></ShowFollowers>
    </div>
    <div>
      <UserInformation v-show="showProfileInformations" :userInfo="m_userInfo" :hash="getHash()"></UserInformation>
    </div>
    <div v-if="m_userInfo">
      <UserVisits v-on:rerenderUserComponent="rerenderUserComponent" v-show="showAllVisitsList" :userInfo="m_userInfo" :key="componentKey"></UserVisits>
    </div>
    <div class="mobile-favorite-list">
      <FullFavoriteList v-show="showFavoriteList" :key="componentKey" v-on:rerenderUserComponent="rerenderUserComponent"
        :fullFavoritesList="userFavoritesList"></FullFavoriteList>
    </div>
    <div>
      <ShowUser v-show="m_showUser" :key="componentKey" :p_userId="m_userId" :p_yourInfo="m_userInfo" v-on:rerenderFollowList="rerenderFollowList" v-on:showUser="showUser"></ShowUser>
    </div>
  </div>

</template>

<script>
import UserInformation from "./userComponents/UserInformation"
import FullFavoriteList from "./userComponents/FullFavoriteList"
import UserVisits from "./userComponents/UserVisits"
import ShowFollowers from "./userComponents/ShowFollowers";
import SearchBarUser from "./userComponents/SearchBarUser";
import ShowUser from "./userComponents/ShowUser";
import { getUser } from "../js/usersApi.js"
import { getUserFavoritesList } from "../js/usersApi.js"
import { createFavoriteList } from "../js/favoriteApi.js"
import {isTokenValid } from "../js/logApi";

const md5 = require('md5');

export default {
  name: "User",
  props: ['p_userInfo'],
  components: {
    ShowUser,
    SearchBarUser,
    UserInformation,
    UserVisits,
    FullFavoriteList,
    ShowFollowers,
  },
  data() {
    return {
      m_userInfo: "",
      userFavoritesList:"",
      showAllVisitsList: false,
      showProfileInformations: true,
      showFavoriteList: false,
      showFollowersList: false,
      showFollowingList: false,
      m_showUser: false,
      m_userId: "",
      emptyListName: " ",
      componentKey: 0,
      componentKeyFollow: 0,
      componentKeySearchBar: 0,
      isOpen: false,
    }
  },
  errorCaptured(){
    this.checkStatus();
  },
  mounted(){
    this.getUserInfo();
    this.getUserFavoritesList();
  },
  methods: {
    getHash() {
      return md5(String(this.m_userInfo.email).trim().toLowerCase());
    },
    rerenderFollowList(userInfo) {
      this.m_userInfo = userInfo;
      this.componentKeyFollow += 1;
      this.componentKeySearchBar += 1;
      this.componentKey += 1;
    },
    showUser(user_id) {
      this.turnAllFalse();
      this.m_userId = user_id;
      this.componentKey += 1;
      this.componentKeySearchBar += 1;
      this.m_showUser = true;
    },
    turnAllFalse(closeSearchList) {
      this.showAllVisitsList = false;
      this.showProfileInformations = false;
      this.showFavoriteList = false;
      this.showFollowersList = false;
      this.showFollowingList = false;
      this.m_showUser = false;
      if (closeSearchList) {
        this.componentKeySearchBar += 1;
      }
    },
    async getUserInfo(){
      this.m_userInfo = await getUser();
    },
    async getUserFavoritesList(){
      const info = await getUserFavoritesList();
      this.userFavoritesList = info.items
    },
    async createList(){
      let name = document.getElementById("newListName").value
      if (name != "") {
        await createFavoriteList(name, this.m_userInfo.email)
        document.getElementById('newListName').value = "";
        this.componentKey += 1;
      }
    },

    openAllVisits() {
      this.showAllVisitsList = true;
    },

    hideAllVisits() {
      this.showAllVisitsList = false;
    },

    rerenderUserComponent() {
      this.getUserInfo();
      this.componentKey += 1;
    },
    async checkStatus(){
      const logged = await isTokenValid()
      if (!logged) {
        this.globalLogout();
      }
    }
  }
}
</script>
<style scoped>

@media (max-width: 768px) {
  div.mobile-favorite-list {
    width: 100vw;
  }
}

@media (min-width: 768px) {
  .mobile-search-first {
    order: -1;
  }
}
</style>
