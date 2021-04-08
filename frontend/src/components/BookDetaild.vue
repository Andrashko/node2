<template>
    <button type="button" @click="edit"> Редагувати </button>
    <h2> {{book.Title}} </h2>
    <p> {{book.Author}}</p>
    <img :src="book.Cover">
    
</template>

<script>
import axios from "axios";

export default {
    props:{
        id:String
    },
    data(){
        return{
            book:{
                Title:"Test",
                Author:"",
                Cover:""
            }
        }
    },
    async mounted(){      
        try{
            let url = `https://localhost:7443/api/book/${this.id}`;
            this.book = (await axios.get(url)).data;
        } catch (err){
            console.log(err);
        }
    },
    methods:{
        async edit(){
            this.$router.push(`/book/${this.id}/edit`);
        }
    }
}
</script>