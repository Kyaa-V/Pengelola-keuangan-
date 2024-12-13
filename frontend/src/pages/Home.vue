<script setup lang="ts">
import { UseThema } from "../hooks/UseThema.ts";
import Modal from "../components/modal/Modal.vue";
import Table from "../components/tabel/Table.vue";
import Chart from "../components/chart/Chart.vue";

const { thema } = UseThema();
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
                ' p-2 shadow-lg mb-3',
                thema === 'day' ? 'bg-white' : ' bg-black'
            ]"
        >
            <Table
                name="Transaksi Penjualan Hari ini"
                :column="['Name', 'Category', 'Harga', 'Jual']"
            />
        </div>
        <div             :class="[
                ' p-2 shadow-lg mb-3',
                thema === 'day' ? 'bg-white' : ' bg-black'
            ]">
            <div class="p-2 text-lg">
                <span>Grafik Penjualan Bulan Desember</span>
            </div>
            <Chart />
        </div>
    </Modal>
</template>
