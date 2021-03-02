<template>
    <div v-if="showNewBookForm" class="whiteboard">
    <form
      v-on:submit.prevent="addNewBook"
      class="newForm"
    >
      <button v-on:click="hide"> X </button>
      Назва <input v-model="newBook.Title" /><br />
      Автори <input v-model="newBook.Author" /> <br />
      Ціна <input type="number" v-model.number="newBook.Price" step="0.01"/> <br />
      Знижка <input type="number" v-model.number="newBook.Disount" /> <br />
       Обгортка <input type="file" v-on:change="selectCover"> <br>
       <img :src="newBook.Cover" alt="Cover" width="100" height="200"><br> 
      <button type="submit">Додати</button>
      <button type="reset">Очистити</button>
    </form>
  </div>
</template>

<script>
export default {
    name:"NewBookForm", 
    data(){
        return{
            showNewBookForm: false,
            newBook: this.modelValue,
        }
    },
    props:{
       modelValue: Object  // Vue 2 - "value"
    }, 
    methods:{
        addNewBook(){
            this.$emit("update:modelValue", this.newBook); //Vue 2 this.$emit("input", ...);
            this.hide();
        }, 
        show(){
            this.showNewBookForm = true;
        },
        hide(){
            this.showNewBookForm = false;
        },
        selectCover(event){
            const cover = event.target.files[0];
            this.newBook.Cover = URL.createObjectURL(cover);
        }
    }, 
    watch:{
      modelValue(newValue){
        this.newBook = newValue;
      }
    }
}
</script>

<style scoped>
.whiteboard{
  width: 1000px;
  height: 1000px;
  background: rgba(255, 255, 255, 0.384);
  position: absolute;
  z-index: 9;
}
form {
  position: absolute;
  z-index: 10;
  background: oldlace;
  margin: 100px auto;
  width: 50%;
}

</style>