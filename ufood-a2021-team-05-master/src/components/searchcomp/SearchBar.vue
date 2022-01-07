  <template>
  <div class="flex text-gray-400 justify-center text-xs sm:text-base">
    <div class="flex flex-wrap">
      <div class="flex mr-6 p-2">
        <h1 class="px-2">Search by name ... :</h1>
        <input placeholder="Enter restaurant's name or ..." id="inputSearch" type="text" class="px-2  border-4 border-l-0 border-r-0 text-yellow-500 border-yellow-500 focus:outline-none  bg-black rounded-lg" v-model="m_RestSearhHome" v-on:input="$emit('refineRestList' ,m_RestSearhHome)">
      </div>
      <div class="flex">
        <h1 class="p-2">... or by filter :</h1>
        <select id="selectFilter"  class="px-2 border-4 border-l-0 border-r-0 border-yellow-500 focus:outline-none  bg-black text-yellow-500 rounded-lg" v-model="m_filter" v-on:change="$emit('refineRestByFilter' ,m_filter)">
          <option class="optionDefault" value="... or choose a filter--">... or choose a filter--</option>
          <option v-for="filter in m_restFilter" :value="filter.value" :key="filter.name">{{filter.name}}</option>
        </select>
      </div>
      <div class="flex">
        <h1 class="p-2">... or by radius :</h1>
        <input type="range" max="300" value="300" class="range range-secondary w-72" id="inputRadius"  v-on:change="$emit('refineByRadius')">
        <input id="textInput" class="text-yellow-500 w-10 h-8 m-2 bg-black" value="" readonly>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted(){
    this.observeResetSearch()
    this.observeResetFilter()
    this.resetFilter()
  },
  data(){
    return{
      m_RestSearhHome: "",
      m_radius:"",
      m_filter: "",
      m_restFilter: [
        { name: "$", value:"1" },
        { name: "$$", value:"2"  },
        { name: "$$$", value:"3"  },
        { name: "$$$$", value:"4"  },
        { name: "ambiance", value: "ambiance" },
        { name: "asiatique", value: "asiatique"  },
        { name: "bistro", value: "bistro"  },
        { name: "boulangerie", value: "boulangerie"  },
        { name: "café", value: "café"  },
        { name: "charcuterie", value: "charcuterie"  },
        { name: "cuisine moléculaire", value: "cuisine moléculaire"  },
        { name: "desserts", value: "desserts"  },
        { name: "fast-food", value: "fast-food"  },
        { name: "fruits de mer", value: "fruits de mer"  },
        { name: "grec", value: "grec"  },
        { name: "hamburgers", value: "hamburgers"  },
        { name: "happy hour", value: "happy hour"  },
        { name: "indien", value: "indien"  },
        { name: "italien", value: "italien"  },
        { name: "japonais", value: "japonais"  },
        { name: "libanais", value: "libanais"  },
        { name: "mexicain", value: "mexicain"  },
        { name: "pizzeria", value: "pizzeria"  },
        { name: "santé", value: "santé"  },
        { name: "steakhouse", value: "steakhouse"  },
      ],
      slider : 0,
    }
  },
  methods:{
    observeResetSearch(){
      const filterSelect = document.getElementById("selectFilter")
      filterSelect.addEventListener("change", () => {
        this.m_RestSearhHome = ""
      })
    },

    observeResetFilter(){
      const searchBar = document.getElementById("inputSearch")
      const selectFilter = document.getElementById('selectFilter')
      searchBar.addEventListener("keypress", () => {
        this.m_filter = "... or choose a filter--"
        selectFilter.selectedIndex = 0
      })
    },
    resetFilter(){
      const selectFilter = document.getElementById('selectFilter')
      selectFilter.selectedIndex = 0
    }
  }
}
</script>
<style scoped>
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: orange;
  opacity: 0.5; /* Firefox */
}
</style>
