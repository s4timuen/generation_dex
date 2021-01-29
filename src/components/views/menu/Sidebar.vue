<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen" class="sidebar-panel">
                <ul class="sidebar-panel-nav">
                    <li>
                        <router-link to="/">{{ $t('link-home') }}</router-link>
                    </li>
                    <li @click.prevent="setDataFilter('national')">{{ $t('sidebar-generation-national') }}</li>
                    <li @click.prevent="setDataFilter('kanto')">{{ $t('sidebar-generation-kanto') }}</li>
                    <li @click.prevent="setDataFilter('johto')">{{ $t('sidebar-generation-johto') }}</li>
                    <li @click.prevent="setDataFilter('hoen')">{{ $t('sidebar-generation-hoen') }}</li>
                    <li @click.prevent="setDataFilter('sinnoh')">{{ $t('sidebar-generation-sinnoh') }}</li>
                    <li @click.prevent="setDataFilter('unova')">{{ $t('sidebar-generation-unova') }}</li>
                    <li @click.prevent="setDataFilter('kalos')">{{ $t('sidebar-generation-kalos') }}</li>
                    <li @click.prevent="setDataFilter('alola')">{{ $t('sidebar-generation-alola') }}</li>
                    <li @click.prevent="setDataFilter('galar')">{{ $t('sidebar-generation-galar') }}</li>
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
        setDataFilter(edition) {
            this.$store.commit('setDataFilter', edition);
        },
    },
};
</script>

<style lang="css">
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
    background-color: #e94848;
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
