<script setup lang="ts">
import Select from "../../../components/input/Select.vue";
import { Fetch } from "../../../api/Fetch";
import { ref } from "vue";
defineProps({
    status: {
        type: String,
        required: true
    }
});
const emit = defineEmits(["@update:modelValue"]);

const prosesResponseCategory = async ({ item, index }) => {
    try {
        const response = await Fetch.post(
            { dataCategory: item },
            "/select-data-category"
        );
        console.log(response.datas.data);

        emit("update:modelValue", response.datas.data);
    } catch (err) {
        console.error(err);
    }
};
</script>
<template>
    <div v-if="status == 'Category'">
        <Select
            :items="['Hp', 'Kartu', 'Service', 'Kuota', 'E-wallet']"
            name="Pilih Kategory"
            defaults="Kategory"
            styles="my-2 mx-3 max-w-full relative z-5 text-black"
            @update:modelValue="prosesResponseCategory"
        />
    </div>
</template>
