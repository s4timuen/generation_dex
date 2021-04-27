<template>
    <div id="app" calss="container-fluid">
        <nav class="main-nav">
            <div class="row">
                <Burger class="col-1" />
                <Sidebar />
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
// todo: styling
// todo: about page
// todo: SEO

import Burger from './components/views/menu/Burger.vue';
import Sidebar from './components/views/menu/Sidebar.vue';

export default {
    name: 'App',
    components: {
        Burger,
        Sidebar,
    },
    data: function() {
        return {};
    },
};
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
