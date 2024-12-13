<script setup lang="ts">
import { ref } from "vue";
import Navbar from "../components/navbar/Navbar.vue";
import Modal from "../components/modal/Modal.vue";
import Table from "../components/tabel/Table.vue";

const datas = [
    "Hari Ini",
    "Kemarin",
    "2 Hari Yang Lalu",
    "Minggu ini",
    "Bulan Ini",
    "1 Bulan yang lalu"
];
const daySelect = ref("");
const handleClick = (data: string) => {
    daySelect.value = data;
};
</script>

<template>
    <Navbar />
    <Modal>
        <div class="w-full">
            <div class="flex justify-center items-center w-full -mt-5 mb-3">
                <span class="text-center text-2xl font-bold">
                    Data Transaksi
                </span>
            </div>
            <div
                class="flex gap-2 p-2 overflow-x-auto overflow-y-hidden max-h-[80px] no-scrollbar"
            >
                <div
                    v-for="(data, index) in datas"
                    :key="index"
                    @click="handleClick(data)"
                    :class="[
                        'min-w-max h-8 px-3 border border-sky-400 rounded-full flex items-center justify-center text-xs whitespace-nowrap',
                        daySelect === data
                            ? 'bg-blue-500 text-white'
                            : 'bg-transparent'
                    ]"
                >
                    <span>{{ data }}</span>
                </div>
            </div>
            <div class="flex gap-1 m-2 max-w-full">
                <div
                    class="flex-1 px-4 py-2 bg-red-500 text-white text-xs flex flex-col items-center justify-center gap-1 shadow rounded font-bold"
                >
                    <span>Modal</span>
                    <span>Rp.19.000</span>
                </div>
                <div
                    class="flex-1 px-4 py-2 shadow text-white text-xs bg-yellow-500 flex flex-col items-center justify-center gap-1 rounded font-bold"
                >
                    <span>Transaksi </span>
                    <span>Rp.19.000</span>
                </div>
                <div
                    class="flex-1 px-4 py-2 bg-green-500 text-white text-xs flex flex-col items-center justify-center gap-1 shadow rounded font-bold"
                >
                    <span>Keuntungan</span>
                    <span>Rp.19.000</span>
                </div>
            </div>
            <div class="overflow-auto p-4 max-w-full flex flex-col">
                <Table name="Transaksi Penjualan"
                :column="['Name','Category','Harga','Jual']"/>

            </div>
        </div>
    </Modal>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
