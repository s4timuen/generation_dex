import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/views/home/Home.vue'
import About from '@/components/views/about/About.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
]

const router = new VueRouter({
    routes: routes,
})

export default router
