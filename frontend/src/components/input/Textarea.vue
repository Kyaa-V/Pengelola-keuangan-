<script setup lang="ts">
defineProps({
  name: { type: String },
  placeholder: { type: String },
  value: { type: String },
});
const emit = defineEmits(["update:value"]);
</script>
<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2 items-center">
      <span>{{ name }}</span>
      <span class="text-sm text-slate-400">/*Opsional</span>
    </div>
    <div class="w-full shadow-md h-36">
      <textarea
        class="px-4 py-3 outline-none w-full h-full"
        :name="name"
        :id="name"
        @input="$emit('update:value', $event.target.value)"
        :placeholder="name"
      />
    </div>
  </div>
</template>
