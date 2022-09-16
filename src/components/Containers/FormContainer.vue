<template>
  <div class="flex flex-col divide-y divide-slate-100">
    <PriceTotal />
    <PriceComponent
      v-for="component in components"
      :key="component.id"
      :args="component"
    />
  </div>
</template>

<script lang="ts" setup>
import PriceComponent from '@/components/Atoms/PriceComponent.vue';
import PriceTotal from '@/components/Atoms/PriceTotal.vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores';

const { components } = storeToRefs(useStore());
components.value.push({
  id: '124',
  initialValue: 2.567,
  label: 'Metal Price',
  disposable: true,
});
</script>

<style scoped></style>
