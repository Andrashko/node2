import axios from "axios";
import { showErrorMessage } from "@/messaging";
import store from "@/store";

const baseUrl = "https://localhost:7443";

export default {
    async getBooksList() {
        try {
            let books = (await axios.get(`${baseUrl}/api/book`)).data;
            return books;
        } catch (err) {
            showErrorMessage(err)
            return [];
        }
    },

    async deleteBook(id) {
        try {
            const token = store.state.token;
            if (token) {
                let deletedBook = (
                    await axios.delete(
                        `${baseUrl}/api/book/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                ).data;
                return deletedBook;
            }
            return null;
        }
        catch (err) {
            showErrorMessage(err);
            return null;
        }
    },

    async postBook(book) {
        try {
            let newBook = (await axios.post(`${baseUrl}/api/book`, book)).data;
            return newBook;
        } catch (err) {
            showErrorMessage(err);
            return null;
        }
    },
}