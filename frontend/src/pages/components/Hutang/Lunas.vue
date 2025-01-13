<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Select from "../../../components/input/Select.vue";
import { Fetch } from "../../../api/Fetch";

const props = defineProps(["status"]);

const datas = ref([]);
const columns = ["Name", "Transaksi", "Hutang", "date", "Status"];

const fetchMounted = async () => {
    try {
        const data = await Fetch.get("/get-hutang-lunas");

        const formattedItems = data.datas.data.map(item => ({
            ...item,
            Hutang: `${item.Hutang.toLocaleString("id-ID")}`
        }));
        datas.value = formattedItems;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

onMounted(fetchMounted);
</script>
<template>
    <div
        class="overflow-x-auto px-4 pb-14 min-h-max relative"
        v-if="props.status == 'Lunas'"
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
                </tr>
            </tbody>
        </table>
    </div>
</template>
