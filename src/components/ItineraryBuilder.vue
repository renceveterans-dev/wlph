<template> 

<div class="d-flex pa-4 rounded-lg" style="background-color: #f5f5f5;flex-wrap: wrap; gap: 16px;">

  <v-btn v-if="itineraryList.length === 0" color="primary" @click="addItinerary(0)">
    Add Itinerary
  </v-btn>
  <v-card v-else v-for="(itinerarItem, index) in itineraryList" :key="itinerarItem.id" max-width="600" class="mr-4 rounded-lg"  flat >
    <v-card-title>
      <v-row no-gutters class="d-flex justify-end mb-2">
        <!-- ADD DAY ITINERARY -->
       <v-btn size="x-small" icon="mdi-plus" class="rounded-circle ml-2" @click="addItinerary(index)">
       </v-btn>
       <!-- SIWTCH ITINERARY -->
       <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn size="x-small" icon="mdi-swap-horizontal" class="rounded-circle ml-2"
            v-bind="props">
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(switchItem, switchIndex) in itineraryList" :key="switchIndex"
            @click="switchItinerary(index, switchIndex)"
            :disabled="switchIndex === index"
          >
            <v-list-item-title>{{ switchItem.day }}: {{ switchItem.title.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
       <!-- SWITCH DAY ITINERARY -->
       <v-btn size="x-small" icon="mdi-content-copy" class="rounded-circle ml-2" @click="duplicateItinerary(index)">
       </v-btn>
       <!-- REMOVE ITINERARY -->
       <v-btn size="x-small" icon="mdi-delete" class="rounded-circle ml-2" @click="removeItinerary(index)">
       </v-btn>
      </v-row>
      <v-row no-gutters>
        <div class="d-flex w-100 align-center" style="height: 40px;">
          <span style="width: 70px;">{{ itinerarItem.day }}: </span>
          <div 
            @mouseenter="itinerarItem.title.isHovered = true" 
            @mouseleave="itinerarItem.title.isHovered = false"
            style="width: 280px; display:inline-block; padding:4px;"
          >
            <!-- Show plain text with border on hover -->
            <span
              v-if="!itinerarItem.title.isEditing" 
              :style="itinerarItem.title.isHovered ? 'width: 100%;border:1px solid #ccc; padding:4px; cursor:text;' : 'width: 100%;padding:4px;'"
              @click="itinerarItem.title.isEditing = true"
            >
              {{ itinerarItem.title.name }}
            </span>

            <!-- Show editable text field when clicked -->
            <v-text-field
              v-else
              v-model="itinerarItem.title.name"
              variant="outlined"
              density="compact"
              hide-details
              autofocus
              rounded="lg"
              @blur="stopEditing(itinerarItem)" 
               style="width: 100%;"
            />
          </div>
        </div>
        
      </v-row>
    </v-card-title>
    <v-card-text>
      <div class="text-center">
        <p>No itinerary data available.</p>
      </div>
    </v-card-text>
  </v-card>

</div>


</template>


<script setup>
import { ref, reactive, watch } from 'vue'

// Props
const props = defineProps({
  itineraryData: { type: Object },
  guestCount: { type: Number },
})

//For text field editing
const isHovered = ref(false)
const isEditing = ref(false)

// Handle blur (when clicking outside)
function stopEditing(item) {
  item.title.isEditing = false
}

// State
const itineraryList = ref([])
const itineraryCount = ref(0)

// Constants (replace with your actual values)
const DRIVER_ALLOWANCE = 300
const GUIDE_FEE_RATE = 800

// Watch props.itineraryData
watch(() => props.itineraryData, (newVal) => {
  console.log("data change:", newVal)
  if (newVal && newVal.itineraryList) {
    itineraryList.value = convertStringToJson(newVal.itineraryList)
  }
})

// Example helper
function convertStringToJson(str) {
  try {
    return JSON.parse(str)
  } catch {
    return []
  }
}

// Convert to string
function convertJsonToString() {
  const jsonString = JSON.stringify(itineraryList.value)
  console.log("Stringified:", jsonString)
  return jsonString
}

function getGuestCount() {
  return props.guestCount || 2
}


// Converted function
function addItinerary(index) {
  const position = index + 1
  itineraryCount.value = itineraryList.value.length + 1
  const itineraryId = position + 1

  const itinerary = {
    id: itineraryId,
    day: "Day " + itineraryId,
    startDate: props.itineraryStartDate,
    title: {
      name: "Untitled Itinerary",
      isHovered: false,
      isEditing: false,
    },
    guestCount: getGuestCount(),
    tour: "",
    endDate: "",
    transportationBudget: 0,
    transportationList: [],
    pickUpLocationList: [],
    dropOffLocationList: [],
    ferryItemList: [],
    noteItemList: [],
    hotelClass: "",
    hotelBudget: 0,
    hotelRate: 0,
    hotelList: [],
    locations: [],
    activityBudget: 0,
    activityList: [],
    otherBudget: 0,
    otherList: [],
    isEdit: false,
    driverFeeBudget: 0,
    driverFeeList: [
      { driverFee: DRIVER_ALLOWANCE, label: "Hotel", isEdit: false }
    ],
    guideFeeBudget: 0,
    guideFeeList: [
      { guideFee: GUIDE_FEE_RATE, label: "Hotel", isEdit: false }
    ]
  }

  itineraryList.value.splice(position, 0, itinerary);
  itineraryList.value.forEach((itinerary, index) => {
      let id = index + 1;
      itinerary.id = id;
      itinerary.day = "Day " + id;
  });
}

function removeItinerary(index) {
  itineraryList.value.splice(index, 1);
  itineraryList.value.forEach((itinerary, index) => {
      let id = index + 1;
      itinerary.id = id;
      itinerary.day = "Day " + id;
  });
}


function switchItinerary(oldPosition, newPosition) {

  const tempItinerary = convertStringToJson(convertJsonToString(itineraryList.value))

  // Move itinerary
  const temp = tempItinerary[oldPosition]
  tempItinerary.splice(oldPosition, 1)
  tempItinerary.splice(newPosition, 0, temp)

  // Reassign IDs and days
  tempItinerary.forEach((itinerary, index) => {
    const id = index + 1
    itinerary.id = id
    itinerary.day = "Day " + id
  })

  // Update reactive state
  itineraryList.value = tempItinerary
}


function duplicateItinerary(currentPosition) {
  const tempItinerary = convertStringToJson(convertJsonToString(itineraryList.value))
  const duplicated = JSON.parse(JSON.stringify(tempItinerary[currentPosition]))

  // Insert the duplicate into the next position
  const newPosition = currentPosition + 1
  tempItinerary.splice(newPosition, 0, duplicated)

  // Reassign IDs and day labels
  tempItinerary.forEach((itinerary, index) => {
    const id = index + 1
    itinerary.id = id
    itinerary.day = "Day " + id
    console.log(itinerary)
  })

  // Update the reactive list
  itineraryList.value = tempItinerary
}

</script>