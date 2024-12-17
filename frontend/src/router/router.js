import { createRouter, createWebHistory } from "vue-router";
import FormAdd from "../pages/FormAdd.vue";
import DataTransaksi from "../pages/DataTransaksi.vue";
import Home from "../pages/Home.vue";

const routes = [
    {
        path: "/Transaksi",
        name: "Transaksi",
        component: FormAdd
    },
    {
        path: "/Data",
        name: "Data Transaksi",
        component: DataTransaksi
    },
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/Profile",
        name: "Profile",
        component: Home
    },
    {
        path: "/Analyst",
        name: "Analyst",
        component: Home
    },
    {
        path: "/Hutang",
        name: "Hutang",
        component: Home
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
