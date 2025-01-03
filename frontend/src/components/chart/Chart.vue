<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
    datachart: {
        type: Array as () => number[]
    }
});

console.log(props.datachart);

const DATA_COUNT = 31;
const labels = Array.from({ length: DATA_COUNT }, (_, i) => (i + 1).toString());

const datapoints = ref(Array(DATA_COUNT).fill(0));


watch(
    () => props.datachart,
    newData => {
        if (newData && Array.isArray(newData)) {
            datapoints.value = newData;
            
        }
    },
    { immediate: true }
);

const data = ref({
    labels: labels,
    datasets: [
        {
            label: "Transaksi Penjualan Bulan January",
            data: datapoints.value,
            borderColor: "rgba(255, 99, 132, 1)",
            fill: false,
            tension: 0.4
        }
    ]
});

const config = {
    type: "line",
    data: data.value,
    options: {
        responsive: false,
        maintainAspectRatio: false,
        interaction: {
            intersect: false
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true
                }
            },
            y: {
                display: true,
                suggestedMin: -10,
                suggestedMax: 30
            }
        }
    }
};

const chartRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    if (chartRef.value) {
        new Chart(chartRef.value, config);
    }
});
</script>

<template>
    <div
        style="
            width: 100%;
            max-width: 100vw;
            height: 400px;
            overflow-x: auto;
            overflow-y: hidden;
        "
    >
        <canvas ref="chartRef" style="min-width: 100vw; height: 100%"></canvas>
    </div>
</template>
