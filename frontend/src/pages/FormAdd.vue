<script setup lang="ts">
import { ref } from "vue";
import { IsLoading } from "../hooks/IsLoading";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import Input from "../components/input/Input.vue";
import Modal from "../components/modal/Modal.vue";
import Setor from "./components/formAdd/Setor.vue";
import ModalAwal from "./components/formAdd/ModalAwal.vue";
import Select from "../components/input/Select.vue";
import InputRadio from "../components/input/InputRadio.vue";
import Textarea from "../components/input/Textarea.vue";
import Button from "../components/button/Button.vue";
import SideBar from "../components/navbar/SideBar.vue";
import { Fetch } from "../api/Fetch.ts";
import { UseThema } from "../hooks/UseThema.ts";

interface IFormData {
    name: string;
    modal: number;
    sell: number;
    category: string;
    nameCustomer: string;
    information: string;
    status: string;
}

const { isLoading, onLoading } = IsLoading();
const toast = useToast();

const formData = ref<IFormData>({
    name: "",
    modal: 0,
    sell: 0,
    category: "",
    nameCustomer: "",
    information: "",
    status: "Pemasukan"
});
const errDataForm = ref({});

const handleClick = () => {
    formData.value.name = "";
    formData.value.modal = 0;
    formData.value.sell = 0;
    formData.value.category = "";
    formData.value.nameCustomer = "";
    formData.value.status = "Pemasukan";
};

const handleSubmit = async e => {
    e.preventDefault();
    onLoading();
    const data = await Fetch.post(formData.value, "/add-form-transaksi");

    console.log(data.succes);

    if (data.succes) {
        onLoading();
        handleClick();
        console.log("berhasil");
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

        onLoading(false);
        if (errDataForm) {
            errDataForm.value = fieldError || {};
        }
        return;
    }
};
</script>
<template>
    <div class="min-h-screen">
        <Modal>
            <h1 class="text-bold text-center text-xl">Tambah Pengeluaran</h1>
            <div class="mt-3 px-5">
                <form @submit="handleSubmit">
                    <Input
                        name="Nama Barang"
                        placeholder="Masukkan Nama Barang"
                        v-model:value="formData.name"
                    />
                    <p
                        v-if="errDataForm.name"
                        class="text-xs text-red-600 ml-3 mt-1"
                    >
                        {{ errDataForm.name }}
                    </p>
                    <InputRadio
                        name="status"
                        :nameCs="['Pemasukan', 'Modal', 'Setor']"
                        v-model:modelValue="formData.status"
                    />
                    <ModalAwal :status="formData.status" />
                    <Setor :status="formData.status" />
                    <div v-if="formData.status == 'Pemasukan'">
                        <div class="flex gap-2">
                            <div>
                                <Input
                                    name="Modal"
                                    type="number"
                                    placeholder=" Modal"
                                    v-model:value="formData.modal"
                                />
                                <p
                                    v-if="errDataForm.modal"
                                    class="text-xs text-red-600 ml-3 mt-1"
                                >
                                    {{ errDataForm.modal }}
                                </p>
                            </div>
                            <div>
                                <Input
                                    name="Jual"
                                    type="number"
                                    placeholder=" Jual"
                                    v-model:value="formData.sell"
                                />
                                <p
                                    v-if="errDataForm.sell"
                                    class="text-xs text-red-600 ml-3 mt-1"
                                >
                                    {{ errDataForm.sell }}
                                </p>
                            </div>
                        </div>
                        <Select
                            name="Pilih Kategory"
                            v-model:modelValue="formData.category"
                            :items="[
                                'Hp',
                                'Kartu',
                                'Service',
                                'Kuota',
                                'E-wallet'
                            ]"
                        />
                        <p
                            v-if="errDataForm.category"
                            class="text-xs text-red-600 ml-3 mt-1"
                        >
                            {{ errDataForm.category }}
                        </p>
                        <InputRadio
                            name="nameCS"
                            :nameCs="['Rizqi', 'Africh']"
                            v-model:modelValue="formData.nameCustomer"
                        />
                        <p
                            v-if="errDataForm.nameCustomer"
                            class="text-xs text-red-600 ml-3 mt-1"
                        >
                            {{ errDataForm.nameCustomer }}
                        </p>
                        <Textarea
                            name="Keterangan"
                            placeholder="Masukkan keterangan"
                            v-model:value="formData.information"
                        />
                        <div class="flex gap-2 mt-2">
                            <Button
                                :isLoading="isLoading"
                                :styles="[
                                    'px-4 py-3 shadow rounded text-bold',
                                    isLoading
                                        ? 'bg-grey text-black'
                                        : 'bg-lime-400 text-white '
                                ]"
                            >
                                {{ isLoading ? "Loading" : "Tambah" }}
                            </Button>
                            <Button
                                styles="px-4 py-3 shadow rounded bg-red-600 text-white
          text-bold"
                                type="button"
                                @clicked="handleClick"
                                >Hapus</Button
                            >
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    </div>
</template>
