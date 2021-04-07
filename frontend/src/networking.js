import axios from "axios";
// import {mapActions} from "vuex";
// const actions = mapActions (["showMessageForTime"]);

export default {
    async getBooksList(){
        try {
            let books = (await axios.get("https://localhost:7443/api/book")).data;
            return books;
          } catch (err) {
            console.log(err);
            return [];
          }
    },
    async UploadImage(image){
        try {
            let img = new FormData();
            img.append("image", image);
            let uploadFile = (
              await axios.post(`https://localhost:7443/file`, img, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
            ).data;
            return uploadFile;
        }   catch (err) {
            console.log(err);
        }
    },
    async postBook(book){
      try {
        let newBook = (await axios.post("https://localhost:7443/api/book", book)).data ;
        return newBook;
      } catch (err){
        alert ("error");
        console.log("tetstpoint")
        console.error(err);
        // actions.showMessageForTime({
        //   message:{
        //     title:"Error",
        //     text: err
        //   }, 
        //   timeot: 10000
        // });
        return null;
      }
    }
}