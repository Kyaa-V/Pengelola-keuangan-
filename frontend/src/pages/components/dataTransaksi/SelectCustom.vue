<script setup lang="ts">
import Select from "../../../components/input/Select.vue";
import Button from "../../../components/button/Button.vue";
import { Fetch } from "../../../api/Fetch";
import { ref } from "vue";
defineProps({
    status: {
        type: String,
        required: true
    }
});
const emit = defineEmits(["@update:modelValue"]);

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

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const startYear = 2020;
const currentYear = new Date().getFullYear();

const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) =>
    (startYear + i).toString()
);
const date = ref({
    day: "0",
    month: "0",
    year: "0",
    category: ""
});
const prosesResponseDay = ({ item, index }) => {
    date.value.day = item;
};
const prosesResponseMonth = ({ item, index }) => {
    const total = index + 1;
    date.value.month = total.toString();
};
const prosesResponseYear = ({ item, index }) => {
    date.value.year = item;
};

const prosesResponseCategory = async ({ item, index }) => {
    date.value.category = item;
};
const handleSubmit = async () => {
    const selectDate = `${date.value.year}-${date.value.month}-${date.value.day}`;
    console.log(selectDate);
    try {
        const response = await Fetch.post(
            { date: selectDate, category: date.value.category },
            "/select-custom-table"
        );
        console.log(response.datas.data);

        emit("update:modelValue", response.datas.data);
    } catch (err) {
        console.error(err);
    }
};
</script>
<template>
    <div v-if="status == 'Custom'">
        <Select
            :items="['Hp', 'Kartu', 'Service', 'Kuota', 'E-wallet']"
            name="Pilih Kategory"
            defaults="Kategory"
            styles="my-2 mx-3 max-w-full relative z-5 text-black"
            @update:modelValue="prosesResponseCategory"
        />
        <div
            class="flex max-w-screen-sm gap-2 relative flex-wrap justify-center"
        >
            <Select
                :items="days"
                @update:modelValue="prosesResponseDay"
                name="Tanggal"
                defaults="0"
                styles="max-h-full"
            />
            <Select
                :items="months"
                @update:modelValue="prosesResponseMonth"
                name="Bulan"
                defaults="Bulan"
            />
            <Select
                :items="years"
                @update:modelValue="prosesResponseYear"
                name="Tahun"
                defaults="Tahun"
            />
            <Button
                type="button"
                @clicked="handleSubmit"
                styles="py-1 mx-4 w-full shadow rounded bg-red-600
                    text-white flex justify-center items-center
          text-bold"
                >Search</Button
            >
        </div>
    </div>
</template>
