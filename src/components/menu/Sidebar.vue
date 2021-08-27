<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen" class="sidebar-panel">
                <ul class="sidebar-panel-nav">
                    <li>
                        <router-link to="/">{{ $t('link-home') }}</router-link>
                    </li>
                    <li @click.prevent="setDataFilter('national')">{{ $t('generation-national') }}</li>
                    <li @click.prevent="setDataFilter('generation-i')">{{ $t('generation-i') }}</li>
                    <li @click.prevent="setDataFilter('generation-ii')">{{ $t('generation-ii') }}</li>
                    <li @click.prevent="setDataFilter('generation-iii')">{{ $t('generation-iii') }}</li>
                    <li @click.prevent="setDataFilter('generation-iv')">{{ $t('generation-iv') }}</li>
                    <li @click.prevent="setDataFilter('generation-v')">{{ $t('generation-v') }}</li>
                    <li @click.prevent="setDataFilter('generation-vi')">{{ $t('generation-vi') }}</li>
                    <li @click.prevent="setDataFilter('generation-vii')">{{ $t('generation-vii') }}</li>
                    <li @click.prevent="setDataFilter('generation-viii')">{{ $t('generation-viii') }}</li>
                    <li>
                        <router-link to="/about">{{ $t('link-about') }}</router-link>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    components: {},
    date: function() {
        return {};
    },
    computed: {
        isPanelOpen() {
            return this.$store.getters.isNavOpen;
        },
    },
    methods: {
        closeSidebarPanel() {
            this.$store.commit('setNavOpen');
        },
        setDataFilter(generation) {
            this.$store.commit('setDataFilter', generation);
        },
    },
};
</script>

<style scoped lang="css">
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(-100%);
    transition: all 150ms ease-in 0s;
}

.sidebar-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 998;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
}

.sidebar-panel {
    overflow-y: auto;
    background-color: #a4243b;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    width: 25%;
}

ul.sidebar-panel-nav {
    list-style-type: none;
}

ul.sidebar-panel-nav > li {
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;
    display: block;
    padding-bottom: 0.5em;
}
</style>
