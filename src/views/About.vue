<template>
    <div class="container-fluid about">
        <div class="row">
            <h1 class="col-12">{{ $t('about-title') }}</h1>
            <p class="col-12">{{ $t('about-text') }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About',
    components: {},
    date: function() {
        return {};
    },
};
</script>

<style scoped lang="css">
.about {
    background-color: #d8973c;
}
</style>
