<script setup lang="ts">
import { ref, computed } from "vue";
import { StoreModal } from "../../hooks/UseStoreModal.ts";
import { UseThema } from "../../hooks/UseThema.ts";

defineProps(["items", "name", "modelValue", "styles", "defaults"]);

const emit = defineEmits(["update:modelValue"]);
const category = ref("");
const { isOpen, onOpen } = StoreModal();
const { thema, changeThema } = UseThema();
const iconName = computed(() => (isOpen.value ? "chevron-up" : "chevron-down"));
const selectCategory = (item: string, index: number) => {
    category.value = item;
    emit("update:modelValue", { item, index });
    isOpen.value = false;
};
</script>
<template>
    <div :class="styles">
        <span
            :class="[
                'text-semibold mb-1',
                thema === 'day' ? 'text-black' : 'text-white'
            ]"
        >
            {{ name }}
        </span>
        <div class="bg-white max-h-full relative">
            <div
                class="flex justify-between border px-3 py-2 shadow-lg"
                @click="onOpen"
            >
                <span
                    :class="[, thema === 'day' ? ' text-black' : ' text-white']"
                >
                    {{ category || defaults }}
                </span>
                <box-icon :name="iconName"></box-icon>
            </div>
            <div
                v-if="isOpen"
                :class="[
                    'overflow-y-auto flex flex-col p-3 absolute bg-white w-full shadow-lg z-10',
                    thema === 'day' ? ' text-black' : ' text-black'
                ]"
                style="max-height: 200px; position: absolute;"
            >
                <span
                    v-for="(item, index) in items"
                    :key="item"
                    :value="item"
                    @click="selectCategory(item, index)"
                    class="text-base p-1 cursor-pointer hover:bg-gray-200"
                >
                    {{ item }}
                </span>
            </div>
        </div>
    </div>
</template>
