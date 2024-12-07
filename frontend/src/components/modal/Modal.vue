<script setup lang="ts">
import { UseThema } from "../../hooks/UseThema.ts";
const { thema, changeThema } = UseThema();
</script>

<template>
  <div
    :class="[
      'pt-16 pb-8 max-w-screen min-h-screen ml-10 rounded shadow-lg',
      thema === 'day' ? 'bg-white text-black' : 'bg-black text-white',
    ]"
  >
    <slot />
  </div>
</template>
