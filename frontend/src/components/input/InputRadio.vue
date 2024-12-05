<script setup lang="ts">
import { onMounted } from "vue";

defineProps({
  name: { type: String, required: true },
  nameCs: { type: Array, required: true },
  modelValue: { type: String },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex w-full flex-wrap items-center">
    <div v-for="namecs in nameCs" :key="namecs" class="flex gap-2 m-2">
      <input
        type="radio"
        :name="name"
        :value="namecs"
        :id="namecs"
        :checked="namecs === modelValue"
        @change="$emit('update:modelValue', namecs)"
      />
      <label :for="namecs">{{ namecs }}</label>
    </div>
  </div>
</template>
