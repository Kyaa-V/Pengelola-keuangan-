<script setup lang="ts">
import { UseThema } from "../hooks/UseThema.ts";
import { IsLoading } from "../hooks/IsLoading";
import { onMounted, ref } from "vue";
import Modal from "../components/modal/Modal.vue";
import { Fetch } from "../api/Fetch";
import Table from "../components/tabel/Table.vue";
import Chart from "../components/chart/Chart.vue";

const { thema } = UseThema();
const { isLoading, onLoading } = IsLoading();
const dataChart = ref([]);
const datasTableTransaction = ref([]);

onMounted(async () => {
    try {
        const data = await Fetch.get("/one-month");
        console.log(data);
        const daysInMonth = new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
        ).getDate();

        const transactions = Array(daysInMonth).fill(0);

        const dataTransaction = data.datas.data;

        await dataTransaction.forEach(item => {
            transactions[item.tanggal - 1] = item.jumlah_transaksi;
        });
        console.log(transactions);
        dataChart.value = transactions;
        onLoading();
        const dataTable = await Fetch.get("/today");
        console.log(dataTable);
        datasTableTransaction.value = dataTable.datas.data;
    } catch (err) {
        console.error(err);
    }
});
</script>
<template>
    <Modal>
        <div class="ml-16 mb-10 text-xl font-bold">
            <span>Dashboard Penjualan</span>
        </div>
        <div
            :class="[
                'flex gap-1 -mt-5 mb-3 max-w-full  shadow-xl p-2',
                thema === 'day' ? ' bg-white' : ' bg-black'
            ]"
        >
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
        <div
            :class="[
                ' p-2 shadow-lg mb-3 overflow-auto px-4 pb-14 max-w-full flex   flex-col max-h-max',
                thema === 'day' ? 'bg-white' : ' bg-black'
            ]"
        >
            <Table
                name="Transaksi Penjualan Hari ini"
                :rows="datasTableTransaction"
                :column="['Name', 'Category', 'Harga', 'Jual']"
            />
        </div>
        <div
            :class="[
                ' p-2 shadow-lg mb-3',
                thema === 'day' ? 'bg-white' : ' bg-black'
            ]"
        >
            <div class="p-2 text-lg">
                <span>Grafik Penjualan Bulan January</span>
            </div>
            <Chart v-if="isLoading" :datachart="dataChart" />
        </div>
    </Modal>
</template>
