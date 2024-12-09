<script setup lang="ts">
import { UseThema } from "../../hooks/UseThema.ts";

const { thema } = UseThema();
</script>
<template>
    <div
        :class="[
            ' w-full pt-7',
            thema === 'day' ? 'bg-white text-black' : 'bg-black text-white'
        ]"
    >
        <div class="flex items-center gap-2 ml-14">
            <box-icon
                name="left-arrow-alt"
                :color="thema === 'night' ? '#fff' : '#000'"
            ></box-icon>
            <span>Home</span>
        </div>
    </div>
</template>
