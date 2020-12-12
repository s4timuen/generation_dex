<template>
    <div id="nav" class="container-fluid">
        <div class="row"> 
            <div class="col-xs-4 col-md-4">
                <router-link to="/">{{ $t("link-home") }}</router-link>
            </div>
            <div class="col-xs-4 col-md-4">
                <router-link to="/dex">{{ $t("link-dex") }}</router-link>
            </div>
            <div class="col-xs-4 col-md-4">
                <router-link to="/about">{{ $t("link-about") }}</router-link>
            </div>
        </div>
        <div>
            <p>{{ this.$store.getters.test }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {

    },
    date: function() {
        return {
     
        }
    }
}
</script>

<style lang="css">

</style>