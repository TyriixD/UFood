<template>
  <div class="flex pl-3 hover:bg-gray-900 height-div border-b-2 border-dotted border-yellow-500">
    <span v-if="hash.md5" class="mr-4 image-cropper">
      <img :src="`https://www.gravatar.com/avatar/${hash.md5}?d=identicon`" alt="" class="rounded">
    </span>
    <span class="w-10/12 self-center row-auto cursor-pointer" @click="showUser(user.id)">
      <div class="flex row-span-1 md:w-5/12 lg:w-5/12">{{ user.name.replace('"', '').replace('\"', '') }}</div>
      <span class="md:w-1/12 lg:w-1/12"></span>
      <div class="flex text-xs row-span-1 md:w-5/12 lg:w-5/12">{{ user.email.replace('"', '').replace('\"', '') }}</div>
    </span>
    <button v-if="showMode === 'following'" :class="isPress? 'cursor-wait':'cursor-pointer'"
            class="flex self-center items-center mr-3 text-sm hover:text-yellow-600 justify-self-end border border-yellow-600 rounded-xl px-3 h-8"
            @click="unfollow(user.id)">Unfollow</button>
    <button v-else-if="showMode === 'follower' && !p_followingListId.includes(user.id) && p_yourId !== user.id"
            class="flex self-center items-center text-sm hover:text-yellow-600 justify-self-end border border-yellow-600 rounded-xl px-3 h-8"
            @click="follow(user.id)">Follow back</button>
    <button v-else-if="showMode === ' following' && !p_followingListId.includes(user.id) && p_yourId !== user.id"
            class="flex self-center items-center text-sm hover:text-yellow-600 justify-self-end border border-yellow-600 rounded-xl px-3 h-8"
            @click="follow(user.id)">Follow</button>
  </div>
</template>

<script>
import { createUserFollower, deleteUserFollow } from "../../js/userFollowerApi";
const md5 = require('md5');

export default {
  name: "IndividualFollowers",
  props: ['user', 'showMode', 'p_followingListId', 'p_yourId'],
  data() {
    return {
      isPress: false,
      hash: "",
    }
  },
  mounted() {
    this.fetchGravatar();
  },
  methods: {
    fetchGravatar() {
      const address = String(this.user.email).trim().toLowerCase();
      this.hash = { md5: md5( address ) };
    },
    showUser(userId) {
      this.$emit('showUser', userId);
    },
    async follow(userId) {
      if (!this.isPress) {
        try {
          const response = await createUserFollower(userId);
          this.$emit('rerenderFollowList', response);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async unfollow(userId) {
      if (!this.isPress) {
        this.isPress = true;
        try {
          const response = await deleteUserFollow(userId);
          this.$emit('rerenderFollowList', response);
        } catch (error) {
          console.log(error)
        }
        this.isPress = false;
      }
    }
  }
};
</script>

<style scoped>

.height-div {
  height: 85px;
}

.image-cropper {
  width: 70px;
  height: 60px;
  position: relative;
  border-radius: 50%;
  margin-top: 9px;
}

img {
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
}

@media (min-width: 768px) {
  .row-auto {
    display: flex;
    grid-row: auto;
  }
  .row-span-1 {
    display: flex;
    grid-row: span 1 / span 1;
    font-size: medium;
    align-items: center;
  }
}
</style>
