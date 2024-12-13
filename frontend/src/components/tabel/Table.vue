<script setup lang="ts">
import { UseThema } from "../../hooks/UseThema.ts";

const { thema } = UseThema();

defineProps({
    name: { type: String },
    column: { type: Array as () => string[] },
    rows: { type: Array as () => any[] }
});
</script>

<template>
    <table
        class="w-full border-collapse border border-gray-300 overflow-y-auto no-scrollbar flex-1"
    >
        <thead>
            <tr :class="[thema === 'day' ? 'bg-gray-200' : 'bg-black']">
                <th
                    class="border border-gray-300 p-2 text-left text-center"
                    :colspan="column.length"
                >
                    {{ name }}
                </th>
            </tr>
            <tr>
                <th
                    v-for="(col, index) in column"
                    :key="index"
                    class="border border-gray-300 p-2 text-center"
                >
                    {{ col }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(row, rowIndex) in rows"
                :key="rowIndex"
                class="even:bg-gray-100"
            >
                <td
                    v-for="(col, colIndex) in column"
                    :key="colIndex"
                    class="border border-gray-300 p-2 min-w-max"
                >
                    {{ row[col] }}
                </td>
            </tr>
        </tbody>
    </table>
    <div
        :class="[
            ' shadow min-w-full p-3 flex items-center justify-end  gap-2 border border-gray-300',
            thema === 'day' ? 'bg-white' : 'bg-black'
        ]"
    >
        <span>per-page</span>
        <span>1</span>
        <box-icon
            name="arrow-to-left"
            :color="thema === 'day' ? '#000' : '#fff'"
        ></box-icon>
        <box-icon
            name="chevron-left"
            :color="thema === 'day' ? '#000' : '#fff'"
        ></box-icon>
        <span>1</span>
        <box-icon
            name="chevron-right"
            :color="thema === 'day' ? '#000' : '#fff'"
        ></box-icon>
        <box-icon
            name="arrow-to-right"
            :color="thema === 'day' ? '#000' : '#fff'"
        ></box-icon>
    </div>
</template>
