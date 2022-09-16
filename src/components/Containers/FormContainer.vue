<template>
  <div class="flex flex-col divide-y divide-slate-100">
    <PriceTotal />
    <PriceComponent
      :disposable="true"
      :label="'Bas Price:'"
      initial-value="1"
    />
    <PriceComponent :disposable="true" :label="'Test'" />
    <PriceComponent :disposable="true" :label="'Test'" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PriceComponent from '@/components/Atoms/PriceComponent.vue';
import PriceTotal from '@/components/Atoms/PriceTotal.vue';

const components = ref([]);
</script>

<style scoped></style>
