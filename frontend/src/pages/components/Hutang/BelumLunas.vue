<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Select from "../../../components/input/Select.vue";
import { Fetch } from "../../../api/Fetch";

const props = defineProps(["status"]);

const datas = ref([]);
const columns = ["Name", "Transaksi", "Hutang", "date"];

const fetchMounted = async () => {
    try {
        const data = await Fetch.get("/get-hutang");

        const formattedItems = data.datas.data.map(item => ({
            ...item,
            Hutang: `${item.Hutang.toLocaleString("id-ID")}`
        }));
        console.log(formattedItems);
        datas.value = formattedItems;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
const prosesResponseHutang = async ({ item, keys }) => {
    try {
        console.log("Status:", item);
        const response = await Fetch.update("/update-hutang-status", {
            id: keys,
            status: item
        });
        if (response.success) {
            fetchMounted();
        }
    } catch (error) {
        console.error("Error updating status:", error);
    }
};
onMounted(fetchMounted);
</script>
<template>
    <div
        class="overflow-x-auto px-4 pb-14 min-h-max relative"
        v-if="props.status == 'Belum lunas'"
    >
        <table class="w-full border-collapse">
            <thead>
                <tr>
                    <th class="p-2 text-center whitespace-nowrap min-w-max">
                        Id
                    </th>
                    <th
                        v-for="column in columns"
                        :key="column"
                        class="p-2 text-center whitespace-nowrap min-w-max"
                    >
                        {{ column }}
                    </th>
                    <th class="p-2 text-center whitespace-nowrap min-w-max">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody class="relative">
                <tr v-for="(data, index) in datas" :key="data.Id">
                    <td class="p-2 text-center whitespace-nowrap min-w-max">
                        {{ index + 1 }}
                    </td>
                    <td
                        v-for="column in columns"
                        :key="column"
                        class="p-2 text-center whitespace-nowrap min-w-max"
                    >
                        {{ data[column] }}
                    </td>
                    <td>
                        <Select
                            :keys="data.Id"
                            :items="['Belum lunas', 'Lunas']"
                            :defaults="data.Status"
                            styles="min-w-full relative z-5 text-black"
                            @update:modelValue="prosesResponseHutang"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
