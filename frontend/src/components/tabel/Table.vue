<script setup lang="ts">
import { ref, computed, defineProps } from "vue";
import { UseThema } from "../../hooks/UseThema.ts";

const props = defineProps({
    name: { type: String, required: true },
    column: { type: Array as () => string[], required: true },
    rows: { type: Array as () => Record<string, any>[] },
    rowsPerPage: { type: Number, default: 10 }
});

const { thema } = UseThema();

const currentPage = ref(0);
const count = ref(1);

const paginatedRows = computed(() => {
    const start = currentPage.value * props.rowsPerPage;
    const end = start + props.rowsPerPage;
    return props.rows.slice(start, end);
});

const goToFirstPage = () => {
    currentPage.value = 0;
    count.value = 1;
};

const goToPreviousPage = () => {
    if (currentPage.value > 0) {
        currentPage.value--;
        count.value--;
    }
};

const goToNextPage = () => {
    if ((currentPage.value + 1) * props.rowsPerPage < props.rows.length) {
        currentPage.value++;
        count.value++;
    }
};

const goToLastPage = () => {
    currentPage.value = Math.ceil(props.rows.length / props.rowsPerPage) - 1;
    count.value = Math.ceil(props.rows.length / props.rowsPerPage);
};
</script>

<template>
    <div v-if="props.rows && props.rows.length">
        <table
            class="w-full border-collapse border border-gray-300 overflow-y-auto no-scrollbar flex-1 relative"
        >
            <thead>
                <tr :class="[thema === 'day' ? 'bg-gray-200' : 'bg-black']">
                    <th
                        class="border border-gray-300 p-2 text-left text-center"
                        :colspan="props.column.length + 1"
                    >
                        {{ props.name }}
                    </th>
                </tr>
                <tr>
                    <th>id</th>
                    <th
                        v-for="(col, index) in props.column"
                        :key="index"
                        class="border border-gray-300 p-2 text-center"
                    >
                        {{ col }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(row, rowIndex) in paginatedRows"
                    :key="rowIndex"
                    class="even:bg-gray-100"
                >
                    <td class="border border-gray-300 p-2 min-w-max">
                        {{ currentPage * props.rowsPerPage + rowIndex + 1 }}
                    </td>
                    <td
                        v-for="(col, colIndex) in props.column"
                        :key="colIndex"
                        class="border border-gray-300 p-2 min-w-max"
                    >
                        {{ row[col] }}
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td :colspan="props.column.length" class="p-3">
                        <div
                            class="min-w-full flex items-center justify-end gap-2"
                        >
                            <div class="flex items-center justify-center">
                                <span>Per Page: {{ count }}</span>
                            </div>
                            <div class="flex items-center justify-center">
                                <box-icon
                                    name="arrow-to-left"
                                    @click="goToFirstPage"
                                    :color="thema === 'day' ? '#000' : '#fff'"
                                ></box-icon>
                                <box-icon
                                    name="chevron-left"
                                    @click="goToPreviousPage"
                                    :color="thema === 'day' ? '#000' : '#fff'"
                                ></box-icon>
                                <span>{{ currentPage + 1 }}</span>
                                <box-icon
                                    name="chevron-right"
                                    @click="goToNextPage"
                                    :color="thema === 'day' ? '#000' : '#fff'"
                                ></box-icon>
                                <box-icon
                                    name="arrow-to-right"
                                    v-if="row.length <= rowsPerPage"
                                    @click="goToLastPage"
                                    :color="thema === 'day' ? '#000' : '#fff'"
                                ></box-icon>
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
    <div v-else>Tidak ada transaksi</div>
</template>
