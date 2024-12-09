import { createRouter, createWebHistory } from "vue-router";
import FormAdd from "../pages/FormAdd.vue";
import DataTransaksi from "../pages/DataTransaksi.vue"

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
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
