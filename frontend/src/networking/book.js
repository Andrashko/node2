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
            const token = store.getters.token;
            if (!token)
                return null;
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
        catch (err) {
            showErrorMessage(err);
            return null;
        }
    },

    async postBook(book) {
        try {
            const token = store.getters.token;
            if (!token)
                return null;
            let newBook = (await axios.post(
                `${baseUrl}/api/book`,
                book,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )).data;
            return newBook;
        } catch (err) {
            showErrorMessage(err);
            return null;
        }
    },

    async getBookById(id) {
        try {
            let book = (await axios.get(`${baseUrl}/api/book/${id}`)).data;
            return book;
        } catch (err) {
            showErrorMessage(err);
            return null;
        }
    },

    async patchBook(book, id) {
        try {
            const token = store.getters.token;
            if (!token)
                return null;
            let updatedBook = (
                await axios.patch(
                    `${baseUrl}/api/book/${id}`,
                    book,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data;
            return updatedBook;
        } catch (err) {
            showErrorMessage(err);
            return null;
        }
    }
}