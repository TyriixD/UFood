<template>
  <div v-if="resto.location">
    <div>
      <div class="flex flex-row mt-5 space-x-5 justify-between pb-2">
        <div class="flex flex-col-reverse sm:flex-row justify-center space-x-5">
          <input type="text" class="h-full text-gray-900 rounded-md mt-2 sm:mt-0" placeholder="Enter your address" v-model="adress" id="autoComplAdress">
          <button class="px-4 py-2 text-white bg-red-500 rounded-md" @click="locatorButtonPressed">Find Me</button>
        </div>
        <div class="flex flex-col sm:flex-row justify-center space-x-5">
          <button class="px-4 py-2 text-white bg-blue-600 rounded-md" @click="directionButtonPressed">Show directions</button>
          <button class="px-4 py-2 text-white bg-blue-600 rounded-md mt-2 sm:mt-0" @click="hideDirections">Hide directions</button>
        </div>
      </div>
      <div class="flex justify-center flex-col sm:flex-row">
        <div id="directionsMap" class="object-fill" style="display: none">
          <div id="map" class=""></div>
        </div>
        <div id="directions" class="justify-left border-2 border-yellow-500 font-serif lg:h-600 md:h-400 sm:h-100" style="display:none"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['resto'],
  data(){
    return{
      adress: "",
      pointA: "",
      pointB: "",
      directionsArr: "",
      m_latitude: "",
      m_longitude: "",
      directionsOverlay:"",
    }
  },
  mounted(){
    this.initializeMap();
    let autoComplAdress = new google.maps.places.Autocomplete(
      document.getElementById("autoComplAdress"),
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(this.m_latitude,this.m_longitude)
        )
      }
    );
    autoComplAdress.addListener("place_changed", () => {
      let place = autoComplAdress.getPlace();
      this.m_latitude = place.geometry.location.lat()
      this.m_longitude = place.geometry.location.lng()
      this.pointA = new google.maps.LatLng(this.m_latitude, this.m_longitude);  
      this.showDirectionsOnMap()  
    })
    navigator.geolocation.getCurrentPosition(position => {
      this.m_latitude = position.coords.latitude;
      this.m_longitude = position.coords.longitude;
      this.pointA = new google.maps.LatLng(this.m_latitude, this.m_longitude);
      this.getAddressFrom(this.m_latitude, this.m_longitude);
    })
  },
  methods: {
    initializeMap (){
      const myLatLng = { lat: this.resto.location.coordinates[1], lng: this.resto.location.coordinates[0] };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: myLatLng,
      });
      var marker = new google.maps.Marker({
        position: myLatLng,
        title: "PointB",
        label: this.resto.name,
        map,
      });
      marker.setMap(map);   
      document.getElementById("directionsMap").style.display ="block";
    },
    directionButtonPressed(){
      document.getElementById("directions").style.display ="block";
      this.showDirectionsOnMap()
    },
    locatorButtonPressed(){
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            this.m_latitude = position.coords.latitude;
            this.m_longitude = position.coords.longitude;
            this.pointA = new google.maps.LatLng(this.m_latitude, this.m_longitude);
            this.getAddressFrom(this.m_latitude, this.m_longitude);
          },error => {
            console.log(error.message);
          }
        );
      }else{
        console.log("Your browser does not support geolocation API");
      }
    },
    getAddressFrom(lat, long){
      let APIkey = "AIzaSyA-Fk7wD4ek5AxjMNcq8cSdrJbCJPrx1Zc";
      axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=" + APIkey).then(response => {
          if(response.data.error_message){
            console.log(response.data.error_message);
          }else{
            this.adress = response.data.results[0].formatted_address;
          }
        })
        .catch(error =>{
          console.log(error.message);
        })
    },
    showDirectionsOnMap(){
      this.pointB = new google.maps.LatLng(this.resto.location.coordinates[1], this.resto.location.coordinates[0]);             //THIS IS TO BE CHANGED -- livrable 2 -- HARDCODED "LA COHUE"
      let myOptions = {
        zoom: 7,
        center: this.pointA
      };
      let map = new google.maps.Map(document.getElementById("map"), myOptions); 
      let directionsService = new google.maps.DirectionsService();
      let directionsDisplay = new google.maps.DirectionsRenderer({
        map:map
      });
      this.directionsOverlay = directionsDisplay
      directionsService.route({
          origin: this.pointA,
          destination: this.pointB,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (response, status) => {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            this.directionsArr = response.routes[0].legs[0].steps;
            this.showAllDirection();
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    },
    showAllDirection(){
      document.getElementById('directions').innerHTML = "";
      this.directionsArr.forEach(element => {
        let parent = document.getElementById("directions");
        let child = document.createElement("div");
        child.className += 'm-4'
        child.innerHTML = element.instructions;
        parent.appendChild(child);
      });
    },
    hideDirections(){
      document.getElementById("directions").style.display ="none"; 
      this.directionsOverlay.suppressMarkers = true;
      this.directionsOverlay.setMap(null);
      this.initializeMap();
    }
  }
}

</script>
<style scoped>
#map{
  position: relative;
  height: 600px;
  width: 1000px;
  filter: invert(85%)
}
@media screen and (max-width: 622px) {
  #map{
    width: 375px;
  }
}
.pac-icon{
  display: none;
}
.pac-item{
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}
.pac-item:hover{
  background-color: orange;
}
.pac-item-query{
  font-size: 16px;
}
</style>