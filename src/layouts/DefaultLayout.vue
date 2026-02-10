<template>
  <v-layout class="app-layout">
    <!-- FIXED DRAWER -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      class="app-drawer"
      @click="rail = false"
    >
      <v-list>
        <v-list-item
          prepend-avatar="/avatar.png"
          title="WLPH"
        >
          <template #append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            />
          </template>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" title="Create Itinerary" to="/createitinerary" />
        <v-list-item prepend-icon="mdi-home" title="Home" to="/" />
        <v-list-item prepend-icon="mdi-flag-triangle" title="Bookings" to="/booking" />
        <v-list-item prepend-icon="mdi-flag-triangle" title="Quotations" to="/quotation" />
        <v-list-item prepend-icon="mdi-flag-triangle" title="Tour Categories" to="/tourcategory" />
        <v-list-item prepend-icon="mdi-flag-triangle" title="Tour Packages" to="/tourpackage" />
        <v-list-item prepend-icon="mdi-flag-triangle" title="Calendar" to="/calendar" />
        <v-list-item prepend-icon="mdi-information" title="About" to="/about" />
      </v-list>
    </v-navigation-drawer>

    <!-- SCROLLABLE MAIN -->
    <v-main class="app-main" >
      <div class="router-scroll" style="height: 100dvh;">
        <router-view />
      </div>
    </v-main>
  </v-layout>
</template>

<style scoped>
.app-layout {
  height: 100vh;
  overflow: hidden;
}

.app-drawer {
  height: 100vh;
}

.app-main {
  height: 100vh;
  overflow: hidden;
}

.router-scroll {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px;
}
</style>



<script setup>

  import { ref } from 'vue'

  const drawer = ref(true)
  const rail = ref(true)


</script>