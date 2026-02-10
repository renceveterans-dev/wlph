<template>
    <v-container  fluid>
        <h3>Create Itinerary</h3>
    </v-container>
    <v-divider></v-divider>
    <v-container  fluid>


        <v-stepper alt-labels editable color="primary" :items="['Tour Details', 'Flight Details', 'Guest', 'Rates', 'Itinerary', 'Coverage', 'Remarks']">
            
            <template v-slot:item.1>
                <v-card title="Tour Details" flat>
                    <v-container>
                        <v-row>
                            <v-select color="primary" v-model="selectedCategory" rounded="lg" variant="outlined"
                                label="Tour Category" density="compact"
                                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
                        </v-row>
                        <v-row>
                            <v-text-field color="primary" v-model="tourTitle" rounded="lg" label="Tour Title"
                                variant="outlined" density="compact"></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field color="primary" v-model="tourDescription" rounded="lg"
                                label="Tour Description" variant="outlined" density="compact"></v-text-field>
                        </v-row>

                        <v-row>
                            <v-col cols="6" md="6" class="pl-0 pt-0">
                                <v-text-field color="primary" v-model="startDate" rounded="lg" label="Start Date"
                                    variant="outlined" density="compact" type="date"></v-text-field>
                            </v-col>
                            <v-col cols="6" md="6" class="pr-0 pt-0">
                                <v-text-field color="primary" rounded="lg" label="End Date" variant="outlined"
                                    density="compact" type="date"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-text-field color="primary" rounded="lg" label="Guest Count" variant="outlined"
                                    density="compact" type="number"></v-text-field>
                        </v-row>


                    </v-container>

                </v-card>
            </template>

             +<template v-slot:item.2>
                <v-card title="Flight Details" flat>

                </v-card>  
            </template>
                    

            <template v-slot:item.3>
                <v-card>
                    <GuestInformation />
                </v-card>
            </template>

            

            <template v-slot:item.4>
                <v-card>
                    <RatesBuilder />
                </v-card>
            </template>

            <template v-slot:item.5>
                <v-card title="Itinerary" flat>
                    <v-container>
                        <v-row>
                            <v-text-field color="primary" v-model="itineraryDescription" rounded="lg"
                                label="Description" variant="outlined" density="compact"></v-text-field>
                        </v-row>
                        <div>
                            <ItineraryBuilder :itineraryData="{ itineraryList: [] }" :guestCount="2" />
                        </div>
                    </v-container>
                    
                    
                </v-card>
            </template>

            <template v-slot:item.6>
                <v-card title="Coverage" flat>
                    <div>
                       
                    </div>
                </v-card>
            </template>

            <template v-slot:item.7>
                <v-card title="Remarks" flat></v-card>
            </template>
        </v-stepper>

    </v-container>

</template>

<script setup>
import { ref, computed } from 'vue'

import GuestInformation from '../components/GuestInformation.vue'
import RatesBuilder from '../components/RatesBuilder.vue'
import ItineraryBuilder from '../components/ItineraryBuilder.vue'


// PACKAGE RATES
// Statement of Acconts and Particulars

// Particulars Table

function createNewParticulars(id) {
  return {
    id,
    particular: '',
    rate: '',
    qty: '',
  }
}

const particularItems = ref([
  {
    id: 1,
    particular: '4D3N South Cebu Tour',
    rate: 8023,
    qty: 4,
  },
])

function removeParticularItem(id) {
  particularItems.value = particularItems.value.filter(i => i.id !== id)
}

function addParticularItem() {
  // Generate next id based on last item
  const nextId = particularItems.value.length
    ? particularItems.value[particularItems.value.length - 1].id + 1
    : 1
  // Push a fresh object with unique id
  particularItems.value.push(createNewParticulars(nextId))
}

const subtotal = (item) => item.rate * item.qty

const totalAmount = computed(() =>
  particularItems.value.reduce((sum, item) => sum + subtotal(item), 0)
)

// Statement of Account Table

const payments = ref([
  {
    id: 1,
    label: 'Reservation/Downpayment',
    status: 'Paid',
    date: '2026-02-06',
    amount: 1000,
  },
  {
    id: 2,
    label: 'Partial Payment (7 days to 3 days before tour date)',
    status: 'Pending',
    date: null,
    amount: 19746,
  },
  {
    id: 3,
    label: 'Full Payment (Upon meet up on the tour)',
    status: 'Pending',
    date: null,
    amount: 19746,
  },
])

function createNewPayment(id) {
  return {
    id,
    label: '',
    status: 'Pending',
    date: null,
    amount: 0,
  }
}

function addNewPayment() {
  // Generate next id based on last item
  const nextId = payments.value.length
    ? payments.value[payments.value.length - 1].id + 1
    : 1
  // Push a fresh object with unique id
  payments.value.push(createNewPayment(nextId))
}

const removePayment = (id) => {
  payments.value = payments.value.filter(p => p.id !== id)
}

// Computed sum of all rows
const sumAmount = computed(() =>
  payments.value.reduce((acc, row) => acc + row.amount, 0)
)

// Validation check
const isValid = computed(() => sumAmount.value === totalAmount.value)

const itineraryList = ref([])

</script>