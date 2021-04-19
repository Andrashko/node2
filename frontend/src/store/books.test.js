import books from "./books";
import { createStore } from "vuex";

// describe("Unit tests for books vuex unit", () => {
//     describe("test mutation setBooks", () => {
//         it("should state.books be equal to set", () => {
//             const testBooks = [
//                 { "Comments": [""], "_id": "606c66b29e6e5730f462cdf9", "Stars": 5, "Disount": 10, "Title": "Vue.js: Up and Running", "Author": "Callum Macrae ", "Price": 29, "Cover": "https://localhost:7443/files/1617769526200.jpg", "__v": 0 },
//                 { "Comments": [""], "_id": "606c67079e6e5730f462cdfa", "Stars": 5, "Disount": 50, "Title": "Web Development with Node and Express: Leveraging the JavaScript Stack", "Author": "Ethan Brown ", "Price": 11, "Cover": "https://localhost:7443/files/1617769509666.jpg", "__v": 0 }, { "Comments": [""], "_id": "607d4fefa84e7038b49b8b5c", "Stars": 5, "Disount": 0, "Title": "test", "Author": "", "Price": 0, "Cover": "https://localhost:7443/files/1618825199387.jpg", "__v": 0 }
//             ];
//             const store = createStore({
//                 state: {
//                     books: []
//                 },
//                 mutations: {
//                     setBooks: books.mutations.setBooks
//                 }
//             });

//             store.commit("setBooks", testBooks);

//             expect(store.state.books).toEqual(expect.arrayContaining(testBooks));
//         });
//     });

// });