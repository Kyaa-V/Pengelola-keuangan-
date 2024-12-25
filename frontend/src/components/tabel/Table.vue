<script setup lang="ts">
import { UseThema } from "../../hooks/UseThema.ts";

const { thema } = UseThema();

defineProps({
    name: { type: String },
    column: { type: Array as () => string[], required: true },
    rows: { required: true }
});
</script>

<template>
    <table
        class="w-full border-collapse border border-gray-300 overflow-y-auto no-scrollbar flex-1 relative"
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
        <tfoot>
            <tr>
                <td :colspan="column.length" class="p-3">
                    <div
                        :class="[
                            ' min-w-full flex items-center justify-end gap-2 '
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
                </td>
            </tr>
        </tfoot>
    </table>
</template>
