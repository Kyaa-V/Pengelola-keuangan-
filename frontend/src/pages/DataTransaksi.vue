<script setup lang="ts">
import Navbar from "../components/navbar/Navbar.vue";
import Modal from "../components/modal/Modal.vue";

const datas = [
    "Hari Ini",
    "Kemarin",
    "2 Hari Yang Lalu",
    "Minggu ini",
    "Bulan Ini",
    "1 Bulan yang lalu"
];
</script>

<template>
    <Navbar />
    <Modal>
        <div class="flex justify-center items-center w-full -mt-5 mb-3">
            <span class="text-center text-2xl font-bold">Data Transaksi</span>
        </div>
        <div
            class="flex gap-2 p-2 overflow-x-auto overflow-y-hidden max-h-[80px] no-scrollbar"
        >
            <div
                class="min-w-max h-8 px-3 border border-sky-400 rounded-full flex items-center justify-center text-xs whitespace-nowrap"
                v-for="(data, index) in datas"
                :key="index"
            >
                <span>{{ data }}</span>
            </div>
        </div>
        <div class="overflow-auto p-4 max-w-full flex flex-col">
            <table
                class="w-full border-collapse border border-gray-300 overflow-y-auto no-scrollbar"
            >
                <thead>
                    <tr class="bg-gray-200">
                        <th
                            class="border border-gray-300 p-2 text-left text-center"
                            colspan="6"
                        >
                            Data Transaksi Penjualan
                        </th>
                    </tr>
                    <tr class="border">
                        <th>Name</th>
                        <th>NameCs</th>
                        <th>Harga</th>
                        <th>Jual</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(row, index) in 5"
                        :key="index"
                        class="even:bg-gray-100"
                    >
                        <td class="border border-gray-300 p-2 min-w-max">1</td>
                        <td class="border border-gray-300 p-2 min-w-max">1</td>
                        <td class="border border-gray-300 p-2 min-w-max">1</td>
                        <td class="border border-gray-300 p-2 min-w-max">1</td>
                    </tr>
                </tbody>
            </table>
            <div
                class="bg-white shadow min-w-full p-3 flex items-center justify-end gap-2"
            >
                <span>per-page</span>
                <box-icon name="arrow-to-left"></box-icon>
                <box-icon name="chevron-left"></box-icon>
                <span>1</span>
                <box-icon name="chevron-right"></box-icon>
                <box-icon name="arrow-to-right"></box-icon>
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
