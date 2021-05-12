<template>
    <div id="app" class="container-fluid">
        <div class="row nav">
            <Burger class="col-1 d-flex justify-start" />
            <Sidebar />
            <Search id="search-form" />
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
// todo: form/mega/dmax/gdmax

import Burger from '@/components/views/menu/Burger.vue';
import Sidebar from '@/components/views/menu/Sidebar.vue';
import Search from '@/components/views/menu/Search.vue';
import { showDiv, hideDiv } from '@/components/helpers/utilities.js';

export default {
    name: 'App',
    components: {
        Burger,
        Sidebar,
        Search,
    },
    data: function() {
        return {};
    },
    computed: {
        currentRoute() {
            return this.$route.name;
        },
    },
    watch: {
        // show form for direct pokemon search only on /home view
        currentRoute(response) {
            switch (response) {
                case 'Home':
                    showDiv('search-form');
                    break;
                default:
                    hideDiv('search-form');
                    break;
            }
        },
    },
    mounted() {
        // hide form for direct pokemon search when loaded/reloaded on other path than /home
        if (this.$route.name != 'Home') {
            hideDiv('search-form');
        }
    },
};
</script>

<style>
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

.search-form {
    justify-self: end;
    margin-right: 1%;
}
</style>
