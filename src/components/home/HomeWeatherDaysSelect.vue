<script setup lang="ts">

const emits = defineEmits<{
    (e: 'update:modelValue', value: number): void;
}>();

const update = (event: Event) => {
    emits('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
    <div class="flex gap-2 w-48 mt-2">
        <select id="days-select" class="block py-2 px-2 w-full text-sm bg-white border-0 w-48 cursor-pointer"
            @change="update">
            <option value="1">1 Day</option>
            <option value="7" selected>7 Days (Default)</option>
            <option value="14">14 Days</option>
        </select>
    </div>
</template>
