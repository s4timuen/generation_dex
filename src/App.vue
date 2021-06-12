<template>
    <div id="app" class="container-fluid">
        <div class="row nav">
            <Burger class="col-1" />
            <Sidebar />
            <Search />
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import Burger from '@/components/menu/Burger.vue';
import Sidebar from '@/components/menu/Sidebar.vue';
import Search from '@/components/menu/Search.vue';

export default {
    name: 'App',
    components: {
        Burger,
        Sidebar,
        Search,
    },
};
</script>

<style lang="css">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000000;
    background-color: #d8973c;
}

.nav {
    display: flex;
    justify-content: space-between;
    background-color: #bd632f;
    padding: 0.5rem 0.8rem;
}

.bold {
    font-weight: bold;
}
</style>
