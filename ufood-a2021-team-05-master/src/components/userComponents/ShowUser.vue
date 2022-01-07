<template>
  <div>
    <nav class="bg-black shadow border-t-2 border-opacity-5 border-yellow-600" id="app">
      <div class="container px-6 py-3 mx-auto">
        <div class="md:flex justify-between items-center">
          <div class="flex justify-between items-center">
            <a class="text-yellow-600 text-xl font-bold md:text-2xl">{{ m_userInfo.name }} | {{ m_userInfo.email }}</a>
            <div class="md:hidden">
            </div>
          </div>
          <div class="mt-3 md:flex-row md:mt-0 md:flex flex justify-around border border-yellow-600 rounded-xl" v-if="m_listFollowingId">
            <button @click="follow(m_userInfo.id)" v-if="!(m_listFollowingId.includes(m_userInfo.id)) && m_userInfo.id !== p_yourInfo.id"
                    class="mb-2 text-white bg-yellow-600 rounded-xl px-3 py-0.5 text-sm hover:text-gray-300 md:mx-4 mt-1">Follow</button>
            <button @click="unfollow(m_userInfo.id)" v-if="(m_listFollowingId.includes(m_userInfo.id)) && m_userInfo.id !== p_yourInfo.id"
                    class="mb-2 text-white bg-yellow-600 rounded-xl px-3 py-0.5 text-sm hover:text-gray-300 md:mx-4 mt-1">Unfollow</button>
            <button @click="turnAllFalse(true); showProfileInformation = !showProfileInformation"
                    class="mb-2 text-sm hover:text-white md:mx-4 mt-1"
                    :class="showProfileInformation? 'text-white' : 'text-yellow-600'">Profile</button>
            <button @click="turnAllFalse(true); showFollowersList = !showFollowersList; componentKey += 1"
                    class="mb-2 text-sm hover:text-white md:mx-4 mt-1"
                    :class="showFollowersList? 'text-white' : 'text-yellow-600'">Followers</button>
            <button @click="turnAllFalse(true); showFollowingList = !showFollowingList; componentKey += 1"
                    class="mb-2 text-sm hover:text-white md:mx-4 mt-1"
                    :class="showFollowingList? 'text-white' : 'text-yellow-600'">Following</button>
          </div>
        </div>
      </div>
    </nav>
    <div>
      <ShowFollowers v-show="showFollowingList" :key="componentKey" :p_userInfo="m_userInfo" :p_yourInfo="m_yourInfo" p_nameList=" following"
                     v-on:rerenderFollowList="rerenderFollowList" v-on:showUser="showUser"></ShowFollowers>
    </div>
    <div>
      <ShowFollowers v-show="showFollowersList" :key="componentKey" :p_userInfo="m_userInfo" :p_yourInfo="m_yourInfo" p_nameList="follower"
                     v-on:rerenderFollowList="rerenderFollowList" v-on:showUser="showUser"></ShowFollowers>
    </div>
    <div>
      <UserInformation v-show="showProfileInformation" :userInfo="m_userInfo" :hash="getHash()"></UserInformation>
    </div>
    <div>
    </div>
  </div>

</template>

<script>
import { getOtherUser } from "../../js/usersApi";
import UserInformation from "./UserInformation";
import ShowFollowers from "./ShowFollowers";
import { createUserFollower, deleteUserFollow } from "../../js/userFollowerApi";
import md5 from "md5";

export default {
  name: "ShowUser",
  props: ['p_userId', 'p_yourInfo'],
  components: {
    UserInformation,
    ShowFollowers,
  },
  data() {
    return {
      m_yourInfo: "",
      m_userInfo: "",
      showProfileInformation: true,
      showFollowersList: false,
      showFollowingList: false,
      componentKey: 0,
      isOpen: false,
      m_listFollowingId: "",
    }
  },
  methods: {
    getHash() {
      return md5(String(this.m_userInfo.email).trim().toLowerCase());
    },
    async follow(user_id) {
      const response = await createUserFollower(user_id);
      this.rerenderFollowList(response);
    },
    async unfollow(user_id) {
      const response = await deleteUserFollow(user_id);
      this.rerenderFollowList(response);
    },
    listedIdFollowers() {
      this.m_listFollowingId = [];
      for (let index in this.p_yourInfo.following) {
        this.m_listFollowingId.push(this.p_yourInfo.following[index].id)
      }
    },
    showUser(userId) {
      this.$emit('showUser', userId);
    },
    rerenderFollowList(yourInfo) {
      this.m_yourInfo = yourInfo;
      this.$emit('rerenderFollowList', yourInfo);
      this.componentKey += 1;
    },
    async getUser() {
      const response = await getOtherUser(this.p_userId);
      this.m_userInfo = response;
      this.m_yourInfo = this.p_yourInfo;
    },
    turnAllFalse(closeSearchList) {
      this.showAllVisitsList = false;
      this.showProfileInformation = false;
      this.showFavoriteList = false;
      this.showFollowersList = false;
      this.showFollowingList = false;
      if (closeSearchList) {
        this.componentKey += 1;
      }
    }
  },
  mounted() {
    this.getUser();
    this.listedIdFollowers();
  }
};
</script>

<style scoped>

</style>
