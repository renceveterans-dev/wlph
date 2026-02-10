<template>
    <v-container>
        <h2>Bookings</h2>

        <v-divider class="mt-2"></v-divider>

        <v-sheet class="mt-4 rounded-lg" border rounded>

            <v-data-table :headers="headers" :hide-default-footer="bookingList.length < 11" :items="bookingList">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>
                            <v-icon color="medium-emphasis" icon="mdi-book-multiple" size="x-small" start></v-icon>

                            Booking List
                        </v-toolbar-title>

                        <v-text-field v-model="searchQuery" 
                            @keydown.enter.prevent="filteredBookings()" append-icon="mdi-magnify" class="ms-4" label="Search"
                            single-line hide-details></v-text-field>

                        <v-btn color="primary" class="me-2" prepend-icon="mdi-plus" rounded="lg" text="Add Booking"
                            @click="add"></v-btn>
                    </v-toolbar>
                </template>

                <template v-slot:[`item.title`]="{ value }">
                    <v-chip :text="value" border="thin opacity-25" prepend-icon="mdi-book" label>
                        <template v-slot:prepend>
                            <v-icon color="medium-emphasis"></v-icon>
                        </template>
                    </v-chip>
                </template>

                <template v-slot:[`item.action`]="{ item }">
                    <div class="d-flex ga-2 justify-end">
                        <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>

                        <v-icon color="medium-emphasis" icon="mdi-delete" size="small"
                            @click="remove(item.id)"></v-icon>
                    </div>
                </template>

                <template v-slot:no-data>
                    <v-btn prepend-icon="mdi-backup-restore" rounded="lg" text="Reset data" variant="text" border
                        @click="reset"></v-btn>
                </template>
            </v-data-table>
        </v-sheet>

        <v-dialog v-model="dialog" max-width="500">
            <v-card :subtitle="`${isEditing ? 'Update' : 'Create'} your favorite book`"
                :title="`${isEditing ? 'Edit' : 'Add'} a Book`">
                <template v-slot:text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="formModel.title" label="Title"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field v-model="formModel.author" label="Author"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select v-model="formModel.genre"
                                :items="['Fiction', 'Dystopian', 'Non-Fiction', 'Sci-Fi']" label="Genre"></v-select>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-number-input v-model="formModel.year" :max="currentYear" :min="1"
                                label="Year"></v-number-input>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-number-input v-model="formModel.pages" :min="1" label="Pages"></v-number-input>
                        </v-col>
                    </v-row>
                </template>

                <v-divider></v-divider>

                <v-card-actions class="bg-surface-light">
                    <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

                    <v-spacer></v-spacer>

                    <v-btn text="Save" @click="save"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


    </v-container>
</template>

<script setup>

import { onMounted, ref, shallowRef, toRef } from 'vue'
import api from '@/services/api'

const bookingList = ref([])
const bookingListCopy = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('') // user input for search

const currentYear = new Date().getFullYear()

function createNewRecord() {
    return {
        title: '',
        tour: '',
        guestNo: '',
        startDate: '',
        endDate: 1,
        rate: '',
        created: '',
        status: '',
        actions: '',
    }
}


const formModel = ref(createNewRecord())
const dialog = shallowRef(false)
const isEditing = toRef(() => !!formModel.value.id)

const headers = [
    { title: 'Title', key: 'guestName', align: 'start' },
    { title: 'Tour', key: 'description' },
    { title: 'Guest No', key: 'guestCount' },
    { title: 'Start Date', key: 'startDate', align: 'end' },
    { title: 'End Date', key: 'endDate', align: 'end' },
    { title: 'Created', key: 'created', align: 'end' },
    { title: 'Status', key: 'status ', align: 'end' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
]

onMounted(() => {
    fetchBookings()
    console.log("Mounted");
})

// Fetch bookings from API
const fetchBookings = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await api.get('/api_getall_bookings.php')
    bookingList.value = response.data.data;
    bookingListCopy.value = bookingList.value; // Keep a copy for filtering
    console.log(bookingList.value);
  } catch (err) {
    error.value = err.message || 'Failed to load data'
  } finally {
    loading.value = false
  }
}

// Search Computed property for filtered list
function filteredBookings() {
  if (!searchQuery.value) {
    bookingList.value = bookingListCopy.value ; // Reset to original list if search is empty
  }
    
  bookingList.value = bookingListCopy.value.filter(b =>
    Object.values(b).some(val =>
      String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )
}

function add() {
    // formModel.value = createNewRecord()
    // dialog.value = true
}

function edit(id) {
    // const found = books.value.find(book => book.id === id)

    // formModel.value = {
    //     id: found.id,
    //     title: found.title,
    //     author: found.author,
    //     genre: found.genre,
    //     year: found.year,
    //     pages: found.pages,
    // }

    // dialog.value = true
}

function remove(id) {
    // const index = books.value.findIndex(book => book.id === id)
    // books.value.splice(index, 1)
}

function save() {
    // if (isEditing.value) {
    //     const index = books.value.findIndex(book => book.id === formModel.value.id)
    //     books.value[index] = formModel.value
    // } else {
    //     formModel.value.id = books.value.length + 1
    //     books.value.push(formModel.value)
    // } 

    //dialog.value = false
}


defineExpose({
  bookingList,
  fetchBookings,
})



</script>
