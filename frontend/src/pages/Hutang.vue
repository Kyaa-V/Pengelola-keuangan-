<script setup lang="ts">
import InputRadio from "../components/input/InputRadio.vue";
import Modal from "../components/modal/Modal.vue";
import BelumLunas from "./components/Hutang/BelumLunas.vue";
import Lunas from "./components/Hutang/Lunas.vue";
import { ref } from "vue";

const dataHutang = ref("Belum lunas");
</script>

<template>
    <Modal>
        <div class="m-2">
            <h1 class="text-center mb-3 text-2xl">Data piutang</h1>
            <div>
                <InputRadio
                    name="status"
                    :nameCs="['Belum lunas', 'Lunas']"
                    v-model:modelValue="dataHutang"
                />
            </div>
            <BelumLunas :status="dataHutang" />
            <Lunas :status="dataHutang" />
        </div>
    </Modal>
</template>
