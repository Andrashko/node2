import { createRouter, createWebHistory } from "vue-router";

import About from "@/components/About";
import Books from "@/components/Books.vue";
import BookDetaild from "@/components/BookDetaild";
import EditForm from "@/components/FullScreenEditBook.vue";
import NewForm from "@/components/FullScreenNewBook.vue";
import SignIn from "@/components/FullScreenSignIn";

import auth from "@/auth";


const Router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Books,
            meta: {
                needAuthentification: true
            }
        },
        {
            path: "/about",
            component: About
        },
        {
            path: "/book/:id",
            component: BookDetaild,
            props: true
        },
        {
            path: "/book/:id/edit",
            component: EditForm,
            props: true,
            meta: {
                needAuthentification: true
            }
        },
        {
            path: "/book/new",
            component: NewForm
        },
        {
            path: "/signin",
            component: SignIn
        }
    ]
});

Router.beforeEach(async (to, from, next) => {
    if (to.meta && to.meta.needAuthentification) {       
        if (await auth.ckeckSignInStatus()){
            console.log(true);
            next();}
        else
            next("/signin");
    } else
        next();
});

export default Router;