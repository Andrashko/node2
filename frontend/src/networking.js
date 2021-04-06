import axios from "axios";
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
    }
}