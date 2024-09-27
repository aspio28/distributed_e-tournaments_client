<script setup lang="ts">
interface Props {
  label: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col">
    <label class="text-2xl mb-1.5 font-shadows">{{ label }}</label>
    <slot />
  </div>
</template>
