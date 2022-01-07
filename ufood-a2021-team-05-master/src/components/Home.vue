<template>
  <div class="relative" v-if="this.m_restaurantFullList">
    <div>
      <section class="text-gray-600">
        <div class="py-5">
          <div class="flex justify-center">
            <div class="flex flex-col justify-center">
              <div>
                <div class="flex justify-center m-2"><h1 class="text-4xl font-bold mb-2 text-white-300">Restaurant Finder</h1></div>
                <div class="h-1 w-full mb-5 bg-yellow-600 rounded"></div>
              </div>
              <div>
                <SearchBar v-on:refineRestList="refineRestList" v-on:refineRestByFilter="refineRestByFilter" v-on:refineByRadius="refineByRadius"></SearchBar>
              </div>
            </div>
            
          </div>
          <div>
            <div  class="flex justify-center mt-2">
              <button  class=" ml-3 rounded-lg bg-yellow-500 p-1 text-black" v-on:click="openModeMap">
                <i class="fa fa-map"></i>
                  Show on Map
              </button>
              <button  class=" ml-3 rounded-lg bg-yellow-500 p-1 text-black" v-on:click="closeModeMap">
                  Hide Map View
              </button>
            </div>
            <div  class="flex justify-center m-4">
              <ModeMap :key="modeMapKey" v-show="showModeMap" :markerList="markerList"></ModeMap>
            </div>
          </div>
          <div>
            <RestListed :key="restListedKey" :restaurantsList="m_restaurantFullList"></RestListed>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { getSearchedRestaurentByFilter } from "../js/restaurantApi.js"
import { getSearchedRestaurentList } from "../js/restaurantApi.js"
import RestListed from "./searchcomp/RestListed"
import SearchBar from "./searchcomp/SearchBar"
import ModeMap from "./searchcomp/ModeMap"

export default {
  components: {
    RestListed,
    SearchBar,
    ModeMap,
  },

  data(){
    return{
      m_restaurantFullList: "",
      RestSearhHome: "",
      m_nb_rest_listed: 25,
      showModeMap: false,
      modeMapKey: 0,
      m_latitude: "",
      m_longitude:"",
      myPosition:"",
      restListedKey: 0,
      markerList:[]
    }
  },

  mounted(){
    this.calculateNbListedRest()
    this.refineRestList("");
    navigator.geolocation.getCurrentPosition(position => {
      this.m_latitude = position.coords.latitude;
      this.m_longitude = position.coords.longitude;
      this.myPosition = new google.maps.LatLng(this.m_latitude, this.m_longitude);
    })
  },

  methods: {
    async refineRestList(nameFilter){
      try{
        const restList = await getSearchedRestaurentList(nameFilter, this.m_nb_rest_listed);
        this.m_restaurantFullList = restList.items;
        this.initializeMarkerList();
        this.rerenderModeMapView();
      }catch (error){
        console.log(error);
      }
    },

    haversine_distance(mk1, mk2) {
      var R = 6371;
      var rlat1 = mk1.position.lat() * (Math.PI/180);
      var rlat2 = mk2.position.lat() * (Math.PI/180);
      var difflat = rlat2-rlat1;
      var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180);

      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      return d;
    },

    async refineByRadius(){
      try{

        let myList = [];
        this.markerList = []
        let restList = await getSearchedRestaurentList("", 500);
        let stringRadius = document.getElementById("inputRadius").value;
        document.getElementById('textInput').value=stringRadius;
        if(stringRadius === ""){
          this.m_restaurantFullList = restList.items;
          this.initializeMarkerList();
          this.rerenderModeMapView();
        }
        else {
          let radius =parseInt(stringRadius);
          const myCoords = { lat: this.m_latitude, lng: this.m_longitude };
          let myPos = new google.maps.Marker({
                position: myCoords,
                title: "My position",
                label: "My position",
                icon: {
                  url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                }
          });
          for (var i = 0; i < restList.items.length; i++) {
            const myLatLng = { lat: restList.items[i].location.coordinates[1], lng: restList.items[i].location.coordinates[0] };
            var marker = new google.maps.Marker({
                position: myLatLng,
                title: restList.items[i].name,
                label: restList.items[i].name,
            });
            var myDistance = this.haversine_distance(myPos, marker);
            if(myDistance <= radius){
              this.markerList.push(marker)
              myList.push(restList.items[i])
            }
          }
          this.markerList.push(myPos)
          this.m_restaurantFullList = myList;
        }
        this.rerenderModeMapView();
      }catch (error){
        console.log(error);
      }
    },

    initializeMarkerList(){
      this.markerList=[];
      for (var i = 0; i < this.m_restaurantFullList.length; i++) {
        let myLatLng = { lat: this.m_restaurantFullList[i].location.coordinates[1], lng: this.m_restaurantFullList[i].location.coordinates[0] };
        var marker = new google.maps.Marker({
            position: myLatLng,
            title: this.m_restaurantFullList[i].name,
            label: this.m_restaurantFullList[i].name,
        });
        this.markerList.push(marker);
      }
    },

    async refineRestByFilter(filter){
      try{
        const restByPrice = await getSearchedRestaurentByFilter(filter, this.m_nb_rest_listed);
        this.m_restaurantFullList = restByPrice.items;
        this.initializeMarkerList();
        this.rerenderModeMapView();
        if ( document.getElementById("selectFilter").value ==="... or choose a filter--"){
          this.refineRestList("");
        }
      }catch (error){
        console.log(error);
      }
    },
    //Refine Result by filter on change in select/option
    async calculateNbListedRest(){

      window.addEventListener('scroll', () => {
        if (window.pageYOffset > (this.m_nb_rest_listed * 40) && this.m_nb_rest_listed < 400)
        {
          this.m_nb_rest_listed += 10
          this.refineRestList("");
        }
      })
    },
    openModeMap() {
      this.rerenderModeMapView()
      this.showModeMap = true;
    },
    closeModeMap() {
      this.showModeMap = false;
    },
    rerenderModeMapView: function () {
      this.modeMapKey += 1;
    },

  }
}
</script>
<style scoped></style>
