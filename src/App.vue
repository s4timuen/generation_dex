<template>
  <div id="app" calss="container-fluid">
    <div class="row">
      <div class="col-12 col-md-12 bg-secondary">
        <nav class="main-nav"> 
          <Burger/>
          <Sidebar/>
        </nav>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12 bg-light">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Burger from "@/components/views/menu/Burger.vue";
import Sidebar from "@/components/views/menu/Sidebar.vue";

export default {
  name: 'App',
  components: {
    Burger, 
    Sidebar
  },
  data: function() {
    return {
      
    }
  }  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-nav {
display: flex;
justify-content: space-between;
padding: 0.5rem 0.8rem;
}
</style>
