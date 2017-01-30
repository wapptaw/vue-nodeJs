<template>
    <div id="homePage">
        <homeHeader></homeHeader>
        <router-view></router-view>
    </div>
</template>

<script>
    import homeHeader from '../components/homeHeader.vue';
    import homebody from '../components/homebody.vue';
    
    export default {
        components: {
            homeHeader,
            homebody
        }
    }
</script>