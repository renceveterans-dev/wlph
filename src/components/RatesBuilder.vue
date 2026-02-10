<template>
    <v-card flat>
        <!-- PACKAGE DETAILS -->
        <v-card-title class="d-flex justify-space-between">
            Package Details
            <v-btn @click="addParticularItem" variant="text" color="primary" prepend-icon="mdi-plus"> 
                Add Particulars
            </v-btn>
        </v-card-title>

        <v-divider />

        <v-table>
            <thead>
                <tr>
                    <th>Particulars</th>
                    <th>Rate</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in particularItems" :key="item.id">
                    <td width="35%">
                        <v-text-field v-model="item.particular" variant="outlined" density="compact" />
                    </td>
                    <td>
                        <v-text-field v-model.number="item.rate" type="number" variant="outlined"
                            density="compact" />
                    </td>
                    <td>
                        <v-text-field v-model.number="item.qty" type="number" variant="outlined"
                            density="compact" />
                    </td>
                    <td width="20%">
                        <v-text-field :model-value="subtotal(item)" readonly variant="outlined"
                            density="compact" />
                    </td>
                    <td>
                        <v-btn icon="mdi-delete" color="error" variant="text"
                            @click="removeParticularItem(item.id)" />
                    </td>
                </tr>

                <tr>
                    <td colspan="3" class="text-right font-weight-bold">
                        Total
                    </td>
                    <td class="font-weight-bold">
                        Php {{ totalAmount.toLocaleString() }}
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </v-table>
    </v-card>

    <!-- STATEMENT OF ACCOUNT -->
    <v-card flat class="mt-10">
        <v-card-title class="d-flex justify-space-between">
            Statement of Account
            <v-btn @click="addNewPayment"
            variant="text" color="primary" prepend-icon="mdi-plus">
                Add Payment Term Item
            </v-btn>
        </v-card-title>

        <v-divider />

        <v-table>
            <tbody>
                <tr v-for="payment in payments" :key="payment.id">
                    <td width="35%">
                        <v-text-field v-model="payment.label" variant="outlined" density="compact" />
                    </td>

                    <td width="15%">
                        <v-select v-model="payment.status" :items="['Paid', 'Pending']" variant="outlined"
                            density="compact" />
                    </td>

                    <td width="20%">
                        <v-text-field v-model="payment.date" type="date" variant="outlined"
                            density="compact" />
                    </td>

                    <td width="20%">
                        <v-text-field v-model.number="payment.amount" type="number" variant="outlined"
                            density="compact" />
                    </td>

                    <td width="5%">
                        <v-btn icon="mdi-delete" color="error" variant="text"
                            @click="removePayment(payment.id)" />
                    </td>
                </tr>
            </tbody>

            <p class="pl-4" v-if="isValid" style="color: green;">
            ✅ Payments match the Particulars total (₱{{ totalAmount }})
            </p>
            <p class="pl-4" v-else style="color: red;">
            ❌ Payments do not match the Particulars total (₱{{ totalAmount }})
            </p>

        </v-table>
    </v-card>
</template>


<script setup>
import { ref, computed } from 'vue'

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
</script>