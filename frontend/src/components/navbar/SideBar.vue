<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { StoreModal } from "../../hooks/UseStoreModal.ts";
import { UseThema } from "../../hooks/UseThema.ts";
import { RouterLink } from "vue-router";

function createData(icon: string, name: string, path: string) {
    return { icon, name, path };
}

const datas = [
    createData("home", "Home", "/"),
    createData("group", "Profile", "/Profile"),
    createData("circle-three-quarter", "Analyst", "/Analyst"),
    createData("wallet", " Transaksi", "/Transaksi"),
    createData("credit-card", "Data Piutang", "/Piutang"),
    createData("purchase-tag-alt", "Data Transaksi", "/Data")
];

const { isOpen, setOpen, onOpen } = StoreModal();
const { thema, changeThema } = UseThema();

const sidebarRef = ref<HTMLElement | null>(null);
const clickMenu = ref("");

const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.value && !sidebarRef.value.contains(event.target as Node)) {
        setOpen(false);
    }
};

const handleClick = (menuName: string) => {
    clickMenu.value = menuName;
};

onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<template>
    <div
        ref="sidebarRef"
        :class="[
            'h-screen shadow-xl z-50 transition-all duration-300 fixed top-0 left-0',
            isOpen ? 'w-64' : 'w-14',
            thema === 'day' ? 'bg-white text-black' : 'bg-black text-white'
        ]"
    >
        <div class="p-2 flex flex-col gap-2">
            <div
                class="relative flex items-center mb-4 mt-5 mr-2 justify-center"
            >
                <span
                    v-if="isOpen"
                    class="absolute left-1/2 transform -translate-x-1/2 text-center text-lg"
                >
                    Menu
                </span>
                <button @click="onOpen" class="ml-auto">
                    <box-icon
                        :name="isOpen ? 'x' : 'menu'"
                        size="sm"
                        :color="thema === 'day' ? '#000' : '#fff'"
                    ></box-icon>
                </button>
            </div>

            <div v-for="data in datas">
                <RouterLink :to="data.path">
                    <div
                        :key="data.name"
                        :class="[
                            'flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors',
                            clickMenu === data.name
                                ? 'bg-sky-500 text-white'
                                : 'hover:bg-gray-300'
                        ]"
                        @click="handleClick(data.name)"
                    >
                        <box-icon
                            :name="data.icon"
                            size="sm"
                            :color="thema === 'day' ? '#000' : '#fff'"
                        ></box-icon>
                        <span v-if="isOpen" class="whitespace-nowrap">{{
                            data.name
                        }}</span>
                    </div>
                </RouterLink>
            </div>

            <div
                class="flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all"
                :class="
                    thema === 'day'
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-black'
                "
                @click="changeThema"
            >
                <box-icon
                    :name="thema === 'day' ? 'sun' : 'moon'"
                    size="sm"
                    :color="thema === 'day' ? '#fff' : '#000'"
                ></box-icon>
                <span v-if="isOpen" class="whitespace-nowrap">
                    {{ thema === "day" ? "Cerah" : "Malam" }}
                </span>
            </div>

            <div
                class="flex items-center justify-center mt-1 gap-3 p-2 rounded-md bg-red-500 text-white font-semibold cursor-pointer"
            >
                <box-icon name="log-out" size="sm" color="#fff"></box-icon>
                <span v-if="isOpen" class="whitespace-nowrap">LogOut</span>
            </div>
        </div>
    </div>
</template>
