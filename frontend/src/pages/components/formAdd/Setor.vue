<script setup lang="ts">
import Button from "../../../components/button/Button.vue";
import Input from "../../../components/input/Input.vue";
import { ref } from "vue";

defineProps({
    status: {
        type: String,
        required: true
    }
});

interface IFormDataSell {
    setor: number;
}
const formDataSell = ref<IFormDataSell>({
    setor: 0
});
</script>
<template>
    <div v-if="status == 'Setor'">
        <Input
            name="Setor"
            type="number"
            placeholder=" Setor Uang"
            v-model:value="formDataSell.setor"
        />
        <div class="flex gap-2 mt-2">
            <Button
                styles="px-4 py-3 shadow rounded bg-lime-400 text-white text-bold"
                >Tambah</Button
            >
            <Button
                styles="px-4 py-3 shadow rounded bg-red-600 text-white
          text-bold"
                type="button"
                @clicked="handleClick"
                >Cancel</Button
            >
        </div>
    </div>
</template>
