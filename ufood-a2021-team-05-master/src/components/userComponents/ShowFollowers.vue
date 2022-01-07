<template>
<div v-if="m_list" class="text-white border-4  border-yellow-500 rounded-xl fullScreen fullScreenMd">
  <div v-if="m_list.length === 0">
    <a>No {{ p_nameList }} yet</a>
  </div>
  <div v-for="(user, i) in m_list" :key="user.id + i" class="">
    <div>
      <IndividualFollowers :user="user" v-on:rerenderFollowList="rerenderFollowList" :showMode="p_nameList" :p_yourId="p_yourInfo.id"
                  :p_followingListId="m_listFollowingId" v-on:showUser="showUser"></IndividualFollowers>
    </div>
  </div>
</div>
</template>

<script>
import IndividualFollowers from "./IndividualFollowers";
import { getUser } from "../../js/usersApi";

export default {
  name: "ShowFollowers",
  props: ['p_userInfo', 'p_nameList', 'p_yourInfo'],
  components: {
    IndividualFollowers,
  },
  data() {
    return {
      m_userInfo: this.p_userInfo,
      m_listFollower: this.p_userInfo.followers,
      m_listFollowing: this.p_userInfo.following,
      m_list: "",
      m_listFollowingId: [],
    }
  },
  methods: {
    showUser(userId) {
      this.$emit('showUser', userId);
    },
    showModeSelection() {
      if (this.p_nameList === "following" || this.p_nameList === " following") {
        this.m_list = this.p_userInfo.following;
      }
      if (this.p_nameList === "follower") {
        this.m_list = this.p_userInfo.followers;
      }
      this.m_listFollowingId = [];
      for (let index in this.p_yourInfo.following) {
        this.m_listFollowingId.push(this.p_yourInfo.following[index].id)
      }
    },
    rerenderFollowList(userInfo) {
      this.$emit('rerenderFollowList', userInfo);
    },
    async getUserInfo(){
      try{
        this.m_userInfo = await getUser();
      }catch (error){
        console.log(error);
      }
    }
  },
  mounted() {
    this.showModeSelection();
  }
};
</script>

<style scoped>
.fullScreen {
  width: 99.7vw;
}

@media (min-width: 768px) {
  .fullScreenMd {
    width: 104.9vw;
  }
}

@media (min-width: 1024px) {
  .fullScreen {
    width: 99.7vw;
  }
}
</style>
