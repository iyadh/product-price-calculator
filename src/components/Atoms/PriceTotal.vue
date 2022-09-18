<template>
  <div class="flex gap-4 mb-4">
    <div class="w-1/2 px-8">
      <h3 class="text-2xl font-bold leading-6 text-gray-900">Total Price</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-400">
        Please enter price components below in order to calculate the total.
      </p>
    </div>
    <div class="w-1/2 flex justify-end items-baseline px-8 gap-2 mr-14">
      <div class="flex items-start text-4xl font-black text-indigo-600">
        {{ total }}
        <span
          class="mt-1 ml-2 text-xs uppercase tracking-widest font-medium text-gray-500"
        >
          Eur/Kg
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/stores';
import { computed } from 'vue';

const store = useStore();

const total = computed(() => {
  return parseFloat(store.totalPrice.toString()).toFixed(2);
});
</script>

<style scoped></style>
