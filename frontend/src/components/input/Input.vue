<script setup lang="ts">
import { UseThema } from "../../hooks/UseThema.ts";
defineProps({
    name: {
        type: String
    },
    placeholder: {
        type: String
    },
    type: {
        type: String,
        default: "text"
    },
    value: {
        type: [String, Number]
    }
});
defineEmits(["update:value"]);

const { thema, changeThema } = UseThema();
</script>
<template>
    <div class="flex flex-col justify-start mt-2">
        <span class="text-semibold mb-1">{{ name }}</span>
        <div
            :class="[
                'w-full px-4 py-2 rounded border bg-white',
                thema === 'day' ? ' text-black' : ' text-black'
            ]"
        >
            <input
                :value="value"
                :type="type"
                :placeholder="placeholder"
                class="w-full outline-none"
                @input="
                    $emit(
                        'update:value',
                        type == 'number'
                            ? parseFloat($event.target.value) || 0
                            : $event.target.value
                    )
                "
            />
        </div>
    </div>
</template>
