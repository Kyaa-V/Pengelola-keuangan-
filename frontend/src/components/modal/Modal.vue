<script setup lang="ts">
import { UseThema } from "../../hooks/UseThema.ts";
const { thema, changeThema } = UseThema();
</script>

<template>
    <div
        :class="[
            'pt-10 pb-8 max-w-screen min-h-screen w-[calc(100%-56px)] ml-14   rounded shadow-lg overflow-hidden',
            thema === 'day' ? 'bg-zinc-50 text-black' : 'bg-black text-white'
        ]"
    >
        <slot />
    </div>
</template>
