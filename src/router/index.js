import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BookingView from '@/views/BookingView.vue'
import QuotationView from '@/views/QuotationView.vue'
import TourPackageView from '@/views/TourPackageView.vue'
import TourCategoryView from '@/views/TourCategoryView.vue'
import CalendarView from '@/views/CalendarView.vue'
import AboutView from '@/views/AboutView.vue'
import CreateItinerary from '@/views/CreateItinerary.vue'


const routes = [
{ path: '/', name: 'Home', component: HomeView },
{ path: '/booking', name: 'Bookings', component: BookingView },
{ path: '/quotation', name: 'Quotations', component: QuotationView },
{ path: '/calendar', name: 'Calendar', component: CalendarView },
{ path: '/tourpackage', name: 'Tour Packages', component: TourPackageView },
{ path: '/tourcategory', name: 'Tour Categories', component: TourCategoryView },
{ path: '/about', name: 'About', component: AboutView },
{ path: '/createitinerary', name: 'Create Itinerary', component: CreateItinerary },

]


export default createRouter({
    history: createWebHistory(),
    routes,
})