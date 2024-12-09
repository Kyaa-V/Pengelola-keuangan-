<script setup lang="ts">
import { ref } from "vue";
import Input from "../components/input/Input.vue";
import Modal from "../components/modal/Modal.vue";
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

const formData = ref<IFormData>({
    name: "",
    modal: 0,
    sell: 0,
    category: "",
    nameCustomer: "",
    information: "",
    status: "Pemasukan"
});

const handleSubmit = async () => {
    const data = Fetch.post(formData.value, "api/expend");
};
const handleClick = () => {
    alert("tes");
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
                    <InputRadio
                        name="nameCS"
                        :nameCs="['Pemasukan', 'Modal', 'Setor']"
                        v-model:modelValue="formData.status"
                    />
                    <div v-if="formData.status == 'Modal'">
                        <Input
                            name="Tambah Modal"
                            type="number"
                            placeholder=" Modal Hari ini"
                            v-model:value="formData.modal"
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
                    <div v-if="formData.status == 'Setor'">
                        <Input
                            name="Setor"
                            type="number"
                            placeholder=" Setor Uang"
                            v-model:value="formData.sell"
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
                    <div v-if="formData.status == 'Pemasukan'">
                        <div class="flex gap-2">
                            <Input
                                name="Modal"
                                type="number"
                                placeholder=" Modal"
                                v-model:value="formData.modal"
                            />
                            <Input
                                name="Jual"
                                type="number"
                                placeholder=" Jual"
                                v-model:value="formData.sell"
                            />
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

                        <InputRadio
                            name="nameCS"
                            :nameCs="['Rizqi', 'Africh']"
                            v-model:modelValue="formData.nameCustomer"
                        />
                        <Textarea
                            name="Keterangan"
                            placeholder="Masukkan keterangan"
                            v-model:value="formData.information"
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
                </form>
            </div>
        </Modal>
    </div>
</template>
