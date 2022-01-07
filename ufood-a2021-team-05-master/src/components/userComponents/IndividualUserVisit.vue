<template>
  <div class="flex m-2 border-b-2 border-dotted border-yellow-500" v-if="this.m_resto">
<!--    <div class="w-1/2"> {{this.m_resto.name}}</div>-->
    <div class="w-1/3"> {{individualVisit.date.substr(0, 10)}}</div>
    <div>
      <button class="rounded-lg p-1 bg-black text-yellow-600" @click="openVisitModal()">View visit</button>
      <VisitModal v-on:rerenderUserComponent="rerenderUserComponent" v-show="showVisitModal" :restoItem="this.m_resto" :editMode="false" :visitItem="individualVisit" @close="closeVisiteModal()"/>
    </div>
  </div>
</template>

<script>
import { getRestaurantById } from "../../js/restaurantApi.js"
import VisitModal from '@/components/VisitModal.vue';
export default {
  props: ["individualVisit"],
  components:{
    VisitModal,
  },
  data() {
    return {
      m_resto: "",
      showVisitModal: false,
    }
  },
  mounted(){
    this.getResto(this.individualVisit.restaurant_id);
  },
  methods: {
    async getResto(restoId){
      this.m_resto = await getRestaurantById(restoId)
    },
    openVisitModal() {
      this.showVisitModal = true;
    },
    closeVisiteModal() {
      this.showVisitModal = false;
    },
    rerenderUserComponent: function () {
      this.$emit('rerenderUserComponent');
    },
  }
}
</script>
<style scoped></style>
