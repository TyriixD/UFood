<template>
  <div v-if="m_listVisitedRestaurants.items && this.restoMap && this.restoName" class="justify-center content-center items-center">
    <div id="visitList" class="text-white border-4  border-yellow-500 rounded-xl fullScreen fullScreenMd"  v-if="this.m_listVisitedRestaurants.items">
      <div v-if="m_listVisitedRestaurants.items.length === 0">
        <a>No visit yet</a>
      </div>
      <div v-for="(list_item, id_resto) in restoMap" :key="id_resto" class="mb-20">
        <div class="">
          <a class="ml-2 border-yellow-500 border-b">{{ restoName[id_resto].name }}</a>
        </div>
        <div v-for="item in list_item" :key="item.id">
          <IndividualUserVisit v-on:rerenderUserComponent="rerenderUserComponent" :individualVisit="item"></IndividualUserVisit>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-white border-4 border-yellow-500 rounded-xl fullScreen fullScreenMd h-screen">
    <div class="loader mt-2 ml-2">
    </div>
  </div>
</template>
<script>

import { getUsersVisits } from "../../js/visiteApi.js"
import IndividualUserVisit from "./IndividualUserVisit"
import { getRestaurantById } from "../../js/restaurantApi";

export default {
  components:{
    IndividualUserVisit
  },
  props: ['userInfo'],
  data() {
    return {
      m_listVisitedRestaurants: "",
      m_nb_visit_listed: 50,
      restoMap: undefined,
      restoName: undefined,
    }
  },
  async mounted(){
    this.calculateNbListedRest()
    await this.getlistVisitedRestaurants();
    await this.sortRestoList();
  },
  methods: {
    async sortRestoList() {
      const list = [];
      const map = {};
      const name = {};

      for (let index in this.m_listVisitedRestaurants.items) {
        if (list.includes(this.m_listVisitedRestaurants.items[index].restaurant_id)) {
          const l = map[this.m_listVisitedRestaurants.items[index].restaurant_id];
          l.push(this.m_listVisitedRestaurants.items[index]);
          map[this.m_listVisitedRestaurants.items[index].restaurant_id] = l;
        } else {
          map[this.m_listVisitedRestaurants.items[index].restaurant_id] = [this.m_listVisitedRestaurants.items[index]];
          list.push(this.m_listVisitedRestaurants.items[index].restaurant_id);
          let n = await getRestaurantById(this.m_listVisitedRestaurants.items[index].restaurant_id);
          name[this.m_listVisitedRestaurants.items[index].restaurant_id] = n;
          //console.log(name[this.m_listVisitedRestaurants.items[index].restaurant_id].name);
        }
      }
      this.restoMap = map;
      this.restoName = name;
    },
    async getlistVisitedRestaurants(){
      try{
        this.m_listVisitedRestaurants = await getUsersVisits("future_id", this.m_nb_visit_listed, this.userInfo.id);
      } catch (error){
        console.log(error);
      }
    },
    rerenderUserComponent: function () {
      this.$emit('rerenderUserComponent');
    },
    calculateNbListedRest(){
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > (this.m_nb_visit_listed * 35) && this.m_nb_visit_listed < 50)
        {
          this.m_nb_visit_listed += 5
          this.getlistVisitedRestaurants();
        }
      })
    },
  }
}
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

.loader {
  border: 5px solid black; /* Light grey */
  border-top: 5px solid orange; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
