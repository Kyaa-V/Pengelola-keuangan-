<script setup lang="ts">
import { ref, computed } from "vue";
import { StoreModal } from "../../hooks/UseStoreModal.ts";
import { UseThema } from "../../hooks/UseThema.ts";

defineProps({
  items: {
    type: Array,
    require: true,
  },
  name: {
    type: String,
  },
  modelValue: {
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);
const category = ref("");
const { isOpen, onOpen } = StoreModal();
const { thema, changeThema } = UseThema();
const iconName = computed(() => (isOpen.value ? "chevron-up" : "chevron-down"));
const selectCategory = (item: string) => {
  category.value = item;
  emit("update:modelValue", item);
  isOpen.value = false;
};
</script>
<template>
  <div class="my-2 max-w-full relative z-5  text-black">
    <span
      :class="[
        'text-semibold mb-1',
        thema === 'day' ? ' text-black' : 'text-black',
      ]"
      >{{ name }}</span
    >
    <div class="bg-white">
      <div
        class="flex justify-between border px-3 py-2 shadow-lg"
        @click="onOpen"
      >
        <span>{{ category || "Pilih kategory" }}</span>
        <box-icon :name="iconName"></box-icon>
      </div>
      <div
        v-if="isOpen"
        :class="[
          'flex flex-col p-3 absolute bg-white w-full shadow-lg',
          thema === 'day' ? ' text-black' : ' text-black',
        ]"
      >
        <span
          v-for="item in items"
          :key="item"
          :value="item"
          @click="selectCategory(item)"
          class="text-base p-1"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>
