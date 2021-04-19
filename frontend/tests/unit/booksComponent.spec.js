import { mount } from '@vue/test-utils';
import { createStore } from "vuex";
import Books from '../../src/components/Books.vue';
import { createRouter, createWebHistory } from 'vue-router';

const testBooks = [
    { "Comments": [""], "_id": "606c66b29e6e5730f462cdf9", "Stars": 5, "Disount": 10, "Title": "Vue.js: Up and Running", "Author": "Callum Macrae ", "Price": 29, "Cover": "https://localhost:7443/files/1617769526200.jpg", "__v": 0 },
    { "Comments": [""], "_id": "606c67079e6e5730f462cdfa", "Stars": 3, "Disount": 50, "Title": "Web Development with Node and Express: Leveraging the JavaScript Stack", "Author": "Ethan Brown ", "Price": 11, "Cover": "https://localhost:7443/files/1617769509666.jpg", "__v": 0 },
    { "Comments": [""], "_id": "607d4fefa84e7038b49b8b5c", "Stars": 2, "Disount": 0, "Title": "test", "Author": "", "Price": 0, "Cover": "https://localhost:7443/files/1618825199387.jpg", "__v": 0 }
];

describe("Unit test for Books component", () => {
    let router;

    beforeAll(()=>{
        router = createRouter({
            history:  createWebHistory(),
            routes: [
                {
                    path: "/book/new",
                    component: Books
                },
                {
                    path:"/",
                    component: Books
                }
            ]
        })
    });

    it("should show no books for 0 ", async () => {
        const store = createStore({
            getters: {
                books: jest.fn(() => [])
            },
            actions: {
                loadBooks: jest.fn()
            }
        });     
        const component = mount(Books, {
            global: {
                plugins: [store, router]
            }
        });

        const books = await component.findAll('li');

        expect(books).toHaveLength(0);
        expect(component.html()).toContain("Нема книг для показу");
    });

    it("should show book list that contains exact same munber of <li> as the storage.state", async () => {
        const store = createStore({
            getters: {
                books: jest.fn(() => testBooks)
            },
            actions: {
                loadBooks: jest.fn()
            }
        });    
        const component = mount(Books, {
            global: {
                plugins: [store, router]
            }
        });

        const books = await component.findAll('li');

        expect(books).toHaveLength(testBooks.length);
    });

});
