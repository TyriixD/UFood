<template>
  <div class="flex-none justify-center flex-col sm:flex-row">
    <div id="directionsMap" class="object-fill">
      <div id="map" class=""></div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['markerList'],

  data(){
      return{  
        m_latitude: "",
        m_longitude:"",
        myPosition:"",
      }
    },

  mounted(){
    this.initializeMap();
  },

  methods: {
    initializeMap (){       
        const map = new google.maps.Map(document.getElementById("map"), {});
        var bounds = new google.maps.LatLngBounds()
        for (const marker of this.markerList){    
            marker.setMap(map); 
            bounds.extend(marker.position);
        } 
        map.fitBounds(bounds);
        map.panToBounds(bounds);
    },

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