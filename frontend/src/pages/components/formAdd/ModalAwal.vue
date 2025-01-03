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

interface IFormDataModal {
    modal: number;
}
const formDataSell = ref<IFormDataModal>({
    modal: 0
});
</script>
<template>
    <div v-if="status == 'Modal'">
        <Input
            name="Tambah Modal"
            type="number"
            placeholder=" Modal Hari ini"
            v-model:value="formDataSell.modal"
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