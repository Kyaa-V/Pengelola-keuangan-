<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: "submit",
  },
  styles: { type: String },
});
const emit = defineEmits(["clicked"]);
</script>
<template>
  <div :class="styles">
    <button :type="type" @click="$emit('clicked')">
      <slot />
    </button>
  </div>
</template>
