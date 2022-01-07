<template> 
  <div v-if="resto.opening_hours">
    <div class="flex justify-center mt-6">
      <div id="schedule" class="text-white border-4 border-yellow-500">
        <table class="m-10 text-left align-middle">
          <thead >
            <tr class="border-b-2 border-dotted border-yellow-500"><b>SCHEDULE</b></tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tr class="border-b-2 border-dotted border-yellow-500" id="Monday">
            <td>Monday</td>
            <td v-if="resto.opening_hours.monday !== null">{{resto.opening_hours.monday}}</td>
            <td v-else>Closed</td>
          </tr>
          <tr class="border-b-2 border-dotted border-yellow-500" id="Tuesday">
            <td>Tuesday</td>
            <td v-if="resto.opening_hours.tuesday !== null">{{resto.opening_hours.tuesday}}</td>
            <td v-else>Closed</td>
          </tr>
          <tr class="border-b-2 border-dotted border-yellow-500 w-" id="Wednesday" >
            <td>Wednesday</td>
            <td v-if="resto.opening_hours.wedenesday !== null">{{resto.opening_hours.wednesday}}</td>
            <td v-else>Closed</td>
          </tr>
          <tr class="border-b-2 border-dotted border-yellow-500" id="Thursday" >
            <td>Thursday</td>
            <td v-if="resto.opening_hours.thursday !== null">{{resto.opening_hours.thursday}}</td>
            <td v-else>Closed</td>
          <tr class="border-b-2 border-dotted border-yellow-500" id="Friday">
            <td>Friday</td>
            <td v-if="resto.opening_hours.friday !== null">{{resto.opening_hours.friday}}</td>
            <td v-else>Closed</td>
          </tr>
          <tr class="border-b-2 border-dotted border-yellow-500" id="Saturday" >
            <td>Saturday</td>
            <td v-if="resto.opening_hours.saturday !== null">{{resto.opening_hours.saturday}}</td>
            <td v-else>Closed</td>
          </tr>
          <tr id="Sunday">
            <td>Sunday</td>
            <td v-if="resto.opening_hours.sunday !== null">{{resto.opening_hours.sunday}}</td>
            <td v-else>Closed</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['resto'],
}
</script>
<style scoped></style>