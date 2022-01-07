<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white flex flex-col border-2 border-yellow-600">
      <header class="flex flex-col p-3.5 border-b-2 border-yellow-600 justify-between bg-black text-yellow-600">
        <slot name="header"> Add visit for : {{restoName}} </slot>
      </header>
      <section class="relative p-3.5 text-black">
        <slot name="body"> 
          Visit date: <input v-model="visitDate" :disabled='!editMode' :max="new Date().toISOString().substr(0, 10)" type="date" value="visitDate" id="idVisite" name="NameVisite">
          <br>
          <div class="rate">
            Rating:
            <form class="rating">
              <label>
                <input type="radio" :disabled='!editMode' v-model="visitRating" name="stars" value="1" />
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" :disabled='!editMode' v-model="visitRating" name="stars" value="2" />
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" :disabled='!editMode' v-model="visitRating" name="stars" value="3" />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>   
              </label>
              <label class="static">
                <input type="radio" :disabled='!editMode' v-model="visitRating" name="stars" value="4" />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label class="static">
                <input type="radio" :disabled='!editMode' v-model="visitRating" name="stars" value="5" />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
            </form>
          </div>
          Comments:
          <br>
          <textarea class="border-2 border-gray-500" :disabled='!editMode' v-model="visitComment" type="text" id="idComment" name="Comments" rows="3" cols="35" placeholder="Insert Comment"></textarea>
        </slot>
      </section>
      <footer class="flex flex-col p-3.5 border-t-2 border-yellow-600 justify-end space-y-1 bg-black">
        <slot name="footer">
          <button type="button" v-show="editMode" class="bg-yellow-500 text-gray-900 rounded-lg" @click="save"> Save Visit </button>
          <button type="button" class="bg-red-600 text-gray-900 rounded-lg" @click="close"> Cancel </button>
        </slot>
        <div>{{TalkToUser}}</div>
      </footer>
    </div>
  </div>
</template>

<script>
import { postRestaurantVisit } from "../js/visiteApi.js"
export default {
  props: ['restoItem','editMode','visitItem'],
  name: 'Modal',
  data() {
    return {
      visitDate: new Date().toISOString().substr(0, 10),
      visitRating: 0,
      visitComment: '',
      restoName: '',
      TalkToUser: ''
    }
  },
  created() {
    if(this.editMode){
      //ajouts des valeurs par defaut
      this.visitDate = new Date().toISOString().substr(0, 10);
      this.visitRating = 0;
      this.visitComment = '';
      this.restoName = this.restoItem.name;
    }else{
      //ajouts des valeurs existante dun props de visit a ajouter
      this.visitDate = this.visitItem.date.substr(0, 10);
      this.visitRating = this.visitItem.rating;
      this.visitComment = this.visitItem.comment;
      this.restoName = this.restoItem.name;
    }
  },
  methods:{
    save(){
      if (this.visitComment != '' && this.visitRating != 0 && this.visitDate){
        this.addRestaurantVisit(this.restoItem.id, this.visitComment, this.visitRating, this.visitDate);
        this.resetValue();
        this.$emit('close');
      }
      else{
        this.TalkToUser = "Please fill all the fields.(Date, Rating, Description)"
      }
    },
    
    close() {
      this.resetValue();
      this.$emit('close');
    },

    resetValue(){
      this.visitDate = new Date().toISOString().substr(0, 10);
      this.visitRating = 0;
      this.visitComment = '';
      this.TalkToUser = '';
    },

    async addRestaurantVisit(visitIdResto, visitComment, visitRating, visitDate){
      try{
        await postRestaurantVisit(visitIdResto, visitComment, visitRating.toString(), visitDate, this.$root.id);
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style>
.rating {
  display: inline-block;
  position: relative;
  height: 20px;
  line-height: 20px;
  font-size: 20px;
}
.rating label {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  cursor: pointer;
}
.rating label:last-child {position: static;}
.rating label:nth-child(1) {z-index: 5;}
.rating label:nth-child(2) {z-index: 4;}
.rating label:nth-child(3) {z-index: 3;}
.rating label:nth-child(4) {z-index: 2;}
.rating label:nth-child(5) {z-index: 1;}
.rating label input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.rating label .icon {
  float: left;
  color: transparent;
}
.rating label:last-child .icon {color: #000;}
.rating:not(:hover) label input:checked ~ .icon,.rating:hover label:hover input ~ .icon {color: #F59E0B;}
.rating label input:focus:not(:checked) ~ .icon:last-child {
  color: #000;
  text-shadow: 0 0 5px #F59E0B;
}
</style>
<style scoped></style>