import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/views/home/Home.vue";
import Dex from "@/components/views/dex/Dex.vue";
import About from "@/components/views/about/About.vue";

Vue.use(VueRouter);

const routes = [
  { 
    path: '/', 
    name: "Home", 
    component: Home 
  },
  { 
    path: '/dex',
    name: "Dex", 
    component: Dex 
  },
  { 
    path: '/about',
    name: "About", 
    component: About 
  }
];

const router = new VueRouter({
  routes: routes 
});

export default router;
