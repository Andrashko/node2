import axios from "axios";
import store from "./store";

const baseUrl = "https://localhost:7443";

export default {
  async getBooksList() {
    try {
      let books = (await axios.get(`${baseUrl}/api/book`)).data;
      return books;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
  async UploadImage(image) {
    try {
      let img = new FormData();
      img.append("image", image);
      let uploadFile = (
        await axios.post(`${baseUrl}/file`, img, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).data;
      return uploadFile;
    } catch (err) {
      console.log(err);
    }
  },
  async postBook(book) {
    try {
      let newBook = (await axios.post(`${baseUrl}/api/book`, book)).data;
      return newBook;
    } catch (err) {
      console.error(err);
      store.dispatch("showMessageForTime", {
        message: {
          title: err.name,
          text: err.message
        },
        timeout: 10000
      });
      return null;
    }
  }
}