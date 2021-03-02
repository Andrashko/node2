import {createRouter, createWebHistory} from "vue-router";

import About from "./components/About";
import Books from "./components/Books.vue";
import Chart from "./components/Chart.vue";
import BookDetaild from "./components/BookDetaild";
import EditForm from "./components/FullScreenEditBook.vue";
import NewForm from "./components/FullScreenNewBook.vue";


const Router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:"/",
            component: Books
        },
        {
            path:"/about",
            component: About
        },
        {
            path:"/chart",
            component: Chart
        },
        {
            path:"/book/:id",
            component: BookDetaild,
            props:true
        },
        {
            path:"/book/:id/edit",
            component: EditForm,
            props:true
        },
        {
            path:"/book/new",
            component: NewForm
        },
        
    ]
});

export default Router;