<script setup lang="ts">
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";

const DATA_COUNT = 31;
const labels = [];
for (let i = 1; i <= DATA_COUNT; ++i) {
    labels.push(i.toString());
}
const datapoints = [0, 20, 20, 60, 60, 120, 150, 180, 120, 125, 105, 110, 170];
const data = {
    labels: labels,
    datasets: [
        {
            label: "Transaksi Penjualan Bulan Desember",
            data: datapoints,
            borderColor: "rgba(255, 99, 132, 1)",
            fill: false,
            tension: 0.4
        }
    ]
};

const config = {
    type: "line",
    data: data,
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
                suggestedMax: 200
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
