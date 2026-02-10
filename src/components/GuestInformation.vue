<template>

    <v-card title="Guest Information" flat>
        <v-container>
            
            <v-row>
                <v-col cols="3" md="3" class="pl-0 pr-0 mt-0 pt-0">
                    <v-text-field v-model="guestCount.adult" color="primary" rounded="lg" label="Adult" variant="outlined"
                        density="compact" type="number"></v-text-field>
                </v-col>
                <v-col cols="3" md="3" class="pr-0 mt-0 pt-0">
                    <v-text-field color="primary" rounded="lg" label="Child" variant="outlined"
                        density="compact" type="number"></v-text-field>
                </v-col>
                <v-col cols="3" md="3" class="pr-0 mt-0 pt-0">
                    <v-text-field v-model="guestCount.senior" color="primary" rounded="lg" label="Senior/PWD" variant="outlined"
                        density="compact" type="number"></v-text-field>
                </v-col>
                <v-col cols="3" md="3" class="pr-0 mt-0 pt-0">
                    <v-text-field v-model="guestCount.infant" color="primary" rounded="lg" label="Infant" variant="outlined"
                        density="compact" type="number"></v-text-field>
                </v-col>
            </v-row>

            <v-row class="mt-4">
                <div class="d-flex align-center justify-space-between w-100"  style="height: 50px;">
                    <p>Guest List</p>
                    <v-btn color="primary" @click="addGuest" prepend-icon="mdi-plus" size="small">Add Guest</v-btn>
                </div>
            </v-row>

           <div v-for="guest in guestList" :key="guest.id">
                <v-card class="pa-4 mb-4 rounded=lg" elevation="2">
                    <v-card-title>
                        <div class="d-flex align-center" style="height: 40px;">
                            <span>Guest {{ guest.id }}</span>
                            <v-spacer></v-spacer>
                            <v-btn color="error" prepend-icon="mdi-close" size="small">Remove</v-btn>
                        </div>
                    </v-card-title>

                    <v-card-text>
                        <v-row>
                            <v-col cols="4" md="4" class="pl-0 pr-0">
                                <v-text-field v-model="guest.firstName" color="primary" rounded="lg" label="First Name" variant="outlined"
                                    density="compact" type="text"></v-text-field>
                            </v-col>
                            <v-col cols="4" md="4" class="pr-0">
                                <v-text-field color="primary" rounded="lg" label="Middle Name" variant="outlined"
                                    density="compact" type="text"></v-text-field>
                            </v-col>
                            <v-col cols="4" md="4" class="pr-0">
                                <v-text-field v-model="guest.lastName" color="primary" rounded="lg" label="Last Name" variant="outlined"
                                    density="compact" type="text"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row class="pt-0 mt-0">
                            <v-col cols="5" md="5" class="pl-0 pr-0">
                                <v-text-field v-model="guest.birthDate" color="primary" rounded="lg" label="Birth Date" variant="outlined"
                                    density="compact" type="date"></v-text-field>
                            </v-col>
                            <v-col cols="2" md="2" class="pr-0">
                                <v-text-field v-model="guest.age" color="primary" rounded="lg" label="Age" variant="outlined"
                                    density="compact" type="number"></v-text-field>
                            </v-col>
                            <v-col cols="5" md="5" class="pr-0">
                                <v-select v-model="guest.gender" color="primary" rounded="lg" variant="outlined"
                                            label="Gender" density="compact"
                                            :items="['Female', 'Male']"></v-select>
                            </v-col>
                        </v-row>

                        <v-row class="pt-0 mt-0 ">
                            <v-col cols="6" md="6" class="pl-0 pr-0 mt-0">
                                <v-text-field color="primary" v-model="contactNo" rounded="lg" label="Contact Number"
                                variant="outlined" density="compact" type="number"></v-text-field>
                            </v-col>
                            <v-col cols="6" md="6" class="pr-0">
                                <v-text-field v-model="emailAddress" rounded="lg" label="Email Address" variant="outlined"
                                density="compact" type="email"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
           </div>

            <v-row class="mt-4">
                <P>Main Contact Information</P>
            </v-row>
            <v-row>
                <v-col cols="4" md="4" class="pl-0 pr-0">
                    <v-text-field v-model="guestMainContact.firstName" color="primary" rounded="lg" label="First Name" variant="outlined"
                        density="compact" type="text"></v-text-field>
                </v-col>
                <v-col cols="4" md="4" class="pr-0">
                    <v-text-field v-model="guestMainContact.middleName" color="primary" rounded="lg" label="Middle Name" variant="outlined"
                        density="compact" type="text"></v-text-field>
                </v-col>
                <v-col cols="4" md="4" class="pr-0">
                    <v-text-field v-model="guestMainContact.lastName" color="primary" rounded="lg" label="Last Name" variant="outlined"
                        density="compact" type="text"></v-text-field>
                </v-col>
            </v-row>

            <v-row class="pt-0 mt-0">
                <v-col cols="5" md="5" class="pl-0 pr-0">
                    <v-text-field v-model="guestMainContact.birthDate" color="primary" rounded="lg" label="Birth Date" variant="outlined"
                        density="compact" type="date"></v-text-field>
                </v-col>
                <v-col cols="2" md="2" class="pr-0">
                    <v-text-field color="primary" rounded="lg" label="Age" variant="outlined"
                        density="compact" type="number"></v-text-field>
                </v-col>
                <v-col cols="5" md="5" class="pr-0">
                    <v-select v-model="guestMainContact.gender" color="primary" rounded="lg" variant="outlined"
                                label="Gender" density="compact"
                                :items="['Female', 'Male']"></v-select>
                </v-col>
            </v-row>

            <v-row class="pt-0 mt-0 ">
                <v-col cols="6" md="6" class="pl-0 pr-0 mt-0">
                    <v-text-field v-model="guestMainContact.contactNo" color="primary" rounded="lg" label="Contact Number"
                    variant="outlined" density="compact" type="number"></v-text-field>
                </v-col>
                <v-col cols="6" md="6" class="pr-0">
                    <v-text-field v-model="guestMainContact.emailAddress" rounded="lg" label="Email Address" variant="outlined"
                    density="compact" type="email"></v-text-field>
                </v-col>
            </v-row>
            
        </v-container>
    </v-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue'


const guestTotalCount = 7;

const guestCount = ref({
    adult: 0,
    child: 0,
    senior: 0,
    infant: 0   
})

const guestMainContact = ref({
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    age: 0,
    contactNo: '',
    emailAddress: '',
})


function createNewGGuest(id) {
  return {
    id,
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    age: 0,
    contactNo: '',
    emailAddress: ''
  }
}

function addGuest() {
  // Generate next id based on last item
  const nextId = guestList.value.length
    ? guestList.value[guestList.value.length - 1].id + 1
    : 1
  // Push a fresh object with unique id
  guestList.value.push(createNewGGuest(nextId))
}

const guestList = ref([
  {
    id: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    age: 0,
    contactNo: '',
    emailAddress: '',
  }
])

// computed validation
const isGuestCountValid = computed(() => {
  const total = guestCount.value.adult +
                guestCount.value.child +
                guestCount.value.senior +
                guestCount.value.infant
  return total === guestTotalCount
})

// optional: watch for debugging
watch(guestCount, (newVal) => {
  console.log('Guest count changed:', newVal)
  console.log('Valid?', isGuestCountValid.value)
}, { deep: true })


</script>