<script setup lang="ts">
defineProps(["type", "styles", "isLoading"]);

const emit = defineEmits(["clicked"]);
</script>
<template>
    <div :class="styles">
        <button :type="type" :disabled="isLoading" @click="$emit('clicked')">
            <slot />
        </button>
    </div>
</template>
