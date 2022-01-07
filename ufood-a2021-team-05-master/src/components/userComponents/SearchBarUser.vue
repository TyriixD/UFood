<template>
<div>
  <link rel="stylesheet"
        href=
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div>
    <span v-show="m_showSearchBar">
          <input autocomplete="off" id="searchUser" type="text" class="rounded-lg text-gray-900 h-8 input" placeholder=" Search user" v-model="m_name" v-on:input="refineListUser()">
    </span>
    <span>
          <i :class="`fa ${m_search} text-yellow-600 ml-3 cursor-pointer`" @click="searhClick()"></i>
    </span>
  </div>
  <div v-if="m_listUser">
    <div class="flex border border-yellow-600 rounded-lg hover:bg-gray-900 cursor-pointer" v-for="user in m_listUser.items" v-bind:key="user.id" v-show="!m_searchIsEmpty">
      <span class="w-9/12" @click="showUser(user.id)">
        <div>
          <span @click="showUser(user.id)">
            {{ user.name.replace('"', '').replace('\"', '').substring(0, 25) }}
          </span>
          <span v-if="user.name.length > 25" @click="showUser(user.id)">
            ...
          </span>
        </div>
        <div class="text-xs" @click="showUser(user.id)">
          {{ user.email.replace('"', '').replace('\"', '') }}
        </div>
      </span>
      <span class="w-3/12 self-center">
        <button v-if="m_idFollowing.includes(user.id) && user.id !== m_userInfo.id" :id="user.id" class="border border-yellow-600 rounded-lg px-3 hover:border-white" @click="toggleFollow(user.id)">Unfollow</button>
        <button v-if="!m_idFollowing.includes(user.id) && user.id !== m_userInfo.id" :id="user.id" class="border border-yellow-600 rounded-lg px-5 hover:border-white" @click="toggleFollow(user.id)">Follow</button>
      </span>
    </div>
  </div>
</div>
</template>

<script>
import { getUserWithParam } from "../../js/usersApi";
import { createUserFollower, deleteUserFollow } from "../../js/userFollowerApi";

export default {
  name: "SearchBarUser",
  props: ['p_userInfo'],
  data(){
    return {
      m_search: "fa-search",
      m_name: "",
      m_listUser: "",
      m_searchIsEmpty: true,
      m_idFollowing: [],
      m_componentKey: 0,
      m_userInfo: this.p_userInfo,
      m_isCalling: false,
      m_showSearchBar: false,
    };
  },
  methods: {
    close() {
      this.m_name = "";
      this.m_searchIsEmpty = true;
    },
    searhClick() {
      this.m_showSearchBar = !this.m_showSearchBar;
      if (this.m_showSearchBar === false) {
        this.m_search = "fa-search"
        this.close();
      } else {
        this.m_search = "fa-close"
      }
      this.$emit('turnAllFalse', false);
      document.getElementById("searchUser").focus();
    },
    showUser(user_id) {
      this.$emit('showUser', user_id);
    },
    async toggleFollow(user_id) {
      if (!this.m_isCalling) {
        this.m_isCalling = true;
        if (this.m_idFollowing.includes(user_id)) {
          await this.unfollow(user_id);
        } else {
          await this.follow(user_id);
        }
        this.listedIdFollowers()
        this.m_isCalling = false;
        this.$emit('rerender');
      }
    },
    async follow(user_id) {
      try {
        const response = await createUserFollower(user_id);
        this.m_userInfo = response;
        const button = document.getElementById(user_id);
        button.innerText = "Unfollow";
      } catch (error) {
        console.log(error);
      }
    },
    async unfollow(user_id) {
      try {
        const response = await deleteUserFollow(user_id);
        this.m_userInfo = response;
        const button = document.getElementById(user_id);
        button.innerText = "Follow";
      } catch (error) {
        console.log(error);
      }
    },
    async refineListUser() {
      if (this.m_name == '') {
        this.m_searchIsEmpty = true;
      } else {
        this.m_searchIsEmpty = false;
        this.$emit('turnAllFalse', false);
      }
      const response = await (getUserWithParam(this.m_name));
      this.m_listUser = response
    },
    listedIdFollowers() {
      this.m_idFollowing = [];
      for (let index in this.m_userInfo.following) {
        this.m_idFollowing.push(this.m_userInfo.following[index].id);
      }
    }
  },
  mounted() {
    this.listedIdFollowers();
  }
};
</script>

<style scoped>

.input {
  width: 23rem;
}

.cursor-pointer {
  cursor: pointer;
}

.icon {
  padding: 10px;
  min-width: 40px;
}
</style>
