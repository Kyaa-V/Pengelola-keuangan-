<script setup lang="ts">
import { ref, onMounted } from "vue";
import Navbar from "../components/navbar/Navbar.vue";
import Modal from "../components/modal/Modal.vue";
import Table from "../components/tabel/Table.vue";
import Button from "../components/button/Button.vue";
import Select from "../components/input/Select.vue";
import InputRadio from "../components/input/InputRadio.vue";
import SelectDate from "./components/dataTransaksi/SelectDate.vue";
import SelectCustom from "./components/dataTransaksi/SelectCustom.vue";
import SelectCategory from "./components/dataTransaksi/SelectCategory.vue";
import { Fetch } from "../api/Fetch";

interface IDays {
    day: string;
    month: string;
    year: string;
}

const datas = [
    "Hari Ini",
    "Kemarin",
    "Minggu ini",
    "Bulan Ini",
    "1 Bulan yang lalu"
];

const months = [
    "January",
    "February",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "July",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
];

const daySelect = ref("");
const row = ref([]);
const statusSelect = ref("Date");

const handleRows = item => {
    console.log("item:", item);
    row.value = item;
};
const handleSelectDate = item => {
    console.log("item:", item);
    row.value = item;
};
const handleCustom = item => {
    console.log("item:", item);
    row.value = item;
};

const handleClick = async (data: string) => {
    daySelect.value = data;
    try {
        let dataRows;
        switch (data) {
            case "Hari Ini":
                dataRows = await Fetch.get("/today");
                break;
            case "Kemarin":
                dataRows = await Fetch.get("/yesterday");
                break;
            case "Minggu ini":
                dataRows = await Fetch.get("/in-weeks");
                break;
            case "Bulan Ini":
                dataRows = await Fetch.get("/in-month");
                break;
            case "1 Bulan yang lalu":
                dataRows = await Fetch.get("/last-month");
                break;
            default:
                console.warn("Data tidak dikenali.");
                return;
        }
        row.value = dataRows.datas.data;
    } catch (err) {
        console.error(err);
    }
};

onMounted(async () => {
    try {
        const dataRow = await Fetch.get("/today");
        console.log(dataRow);
        console.log(dataRow.datas.data);
        row.value = dataRow.datas.data;
    } catch (err) {
        console.error(err);
    }
});
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

            <div>
                <InputRadio
                    name="Select"
                    :nameCs="['Date', 'Category', 'Custom']"
                    v-model:modelValue="statusSelect"
                />
            </div>

            <SelectDate
                :status="statusSelect"
                @update:modelValue="handleSelectDate"
            />

            <SelectCategory
                :status="statusSelect"
                @update:modelValue="handleRows"
            />
            <SelectCustom
                :status="statusSelect"
                @update:modelValue="handleCustom"
            />

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
            <div
                class="overflow-auto px-4 pb-14 max-w-full flex flex-col max-h-max"
            >
                <Table
                    v-if="row && row.length > 0"
                    name="Transaksi Penjualan"
                    :rows="row"
                    :column="[
                        'Name',
                        'Category',
                        'Modal',
                        'Jual',
                        'Nama Penjual'
                    ]"
                />
                <div v-else>Tidak ada transaksi.</div>
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
