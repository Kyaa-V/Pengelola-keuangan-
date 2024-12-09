<script setup lang="ts">
import { RouterView } from "vue-router";
import SideBar from "./components/navbar/SideBar.vue";
</script>
<template>
    <div class="min-h-screen">
        <SideBar />
        <RouterView />
    </div>
</template>
