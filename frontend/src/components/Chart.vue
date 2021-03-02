<template>
    <input type="number" v-model.number="numbers[0]">
    <chart-vue
        v-bind:numbers="numbers"
        v-bind:type="'bar'"
    > </chart-vue>
     <chart-vue
        v-bind:numbers="other"
        v-bind:type="'line'"
    > </chart-vue>
</template>

<script>
import ChartVue from './ChartVue/ChartVue.vue'
export default {
    name:"App",
    components:{
        ChartVue
    } ,
    data(){
        return{
            numbers:[12,7,5,10,6,2],
            other:[1,2,3,4,5,6]
        }
    }
}
</script>

<style scoped>

</style>