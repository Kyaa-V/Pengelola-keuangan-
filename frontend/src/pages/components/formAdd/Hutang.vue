<script setup lang="ts">
import { ref, watch } from "vue";
import Input from "../../../components/input/Input.vue";
import { Fetch } from "../../../api/Fetch";
import { IsLoading } from "../../../hooks/IsLoading";
import { useToast } from "vue-toast-notification";
import Button from "../../../components/button/Button.vue";

const props = defineProps({
    status: {
        type: String,
        required: true
    },
    object: {
        type: String,
        default: ""
    }
});

interface IDataHutang {
    name: string;
    mount: number;
    object: string;
}

const dataHutang = ref<IDataHutang>({
    name: "",
    mount: 0,
    object: ""
});

const { isLoading, onLoading } = IsLoading();
const toast = useToast();
const errDataForm = ref({});

const handleSubmit = async e => {
    e.preventDefault();
    onLoading();
    const data = await Fetch.post(dataHutang.value, "/hutang");

    console.log(data.succes);

    if (data.succes) {
        onLoading();
        console.log("berhasil kirim data");
        toast.success("berhasil kirim data", {
            position: "top"
        });
        dataHutang.value = {
            name: "",
            mount: 0,
            object: props.object || ""
        };
        return;
    }

    if (!data.succes) {
        console.error("Error response:", data);

        const fieldError = data?.errorData?.errors?.reduce((acc, curr) => {
            acc[curr.path] = curr.message;
            return acc;
        }, {});

        console.error("Field error:", fieldError);

        toast.error(data?.message || "Gagal mengirim data", {
            position: "top"
        });

        if (errDataForm) {
            errDataForm.value = fieldError || {};
        }
        onLoading();
        return;
    }
};

watch(
    () => props.object,
    newValue => {
        if (newValue) {
            dataHutang.value.object = newValue;
        }
    },
    { immediate: true }
);
</script>

<template>
    <div v-if="props.status === 'Hutang'" class="space-y-4 inline-block">
        <form @submit="handleSubmit">
            <Input
                name="Nama Orang"
                placeholder="Masukkan Nama Orang"
                v-model:value="dataHutang.name"
            />
            <p v-if="errDataForm.object" class="text-xs text-red-600 ml-3 mt-1">
                {{ errDataForm.object }}
            </p>
            <Input
                name="Jumlah Hutang"
                type="number"
                placeholder="Jumlah Hutang"
                v-model:value="dataHutang.mount"
            />
            <p v-if="errDataForm.mount" class="text-xs text-red-600 ml-3 mt-1">
                {{ errDataForm.mount }}
            </p>
            <Button
                styles="px-4 py-3 shadow rounded bg-lime-400 text-white max-w-max
          text-bold"
                >Submit</Button
            >
        </form>
    </div>
</template>
