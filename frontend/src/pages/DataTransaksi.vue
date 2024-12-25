<script setup lang="ts">
import { ref, onMounted } from "vue";
import Navbar from "../components/navbar/Navbar.vue";
import Modal from "../components/modal/Modal.vue";
import Table from "../components/tabel/Table.vue";
import { Fetch } from "../api/Fetch";

const datas = [
    "Hari Ini",
    "Kemarin",
    "Minggu ini",
    "Bulan Ini",
    "1 Bulan yang lalu"
];

const daySelect = ref("");

const row = ref([]);

const handleClick = async (data: string) => {
    daySelect.value = data;
    try {
        const today = new Date();
        const startOfToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
        const startOfThisWeek = new Date(startOfToday);
        startOfThisWeek.setDate(startOfToday.getDate() - today.getDay());
        const startOfThisMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );
        const startOfLastMonth = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            1
        );
        const endOfLastMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        );
        console.log("Today:", today);
        console.log("Start of Today:", startOfToday);
        console.log("Start of This Week:", startOfThisWeek);
        console.log("Start of This Month:", startOfThisMonth);
        console.log("Start of Last Month:", startOfLastMonth);
        console.log("End of Last Month:", endOfLastMonth);

        console.log(datas);

        const filteredData = datas.filter(item => {
            const itemDate = new Date(item.at_created);

            switch (data) {
                case "Hari Ini":
                    return itemDate >= startOfToday;
                case "Kemarin":
                    const startOfYesterday = new Date(startOfToday);
                    startOfYesterday.setDate(startOfToday.getDate() - 1);
                    return (
                        itemDate >= startOfYesterday && itemDate < startOfToday
                    );
                case "Minggu ini":
                    return itemDate >= startOfThisWeek;
                case "Bulan Ini":
                    return itemDate >= startOfThisMonth;
                case "Bulan lalu":
                    return (
                        itemDate >= startOfLastMonth &&
                        itemDate <= endOfLastMonth
                    );
                default:
                    return true;
            }
        });

        row.value = filteredData;
    } catch (err) {
        console.error(err);
    }
};

onMounted(async () => {
    try {
        const dataRow = await Fetch.get("/data-transaksi");
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
