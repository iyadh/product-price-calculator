<template>
  <div class="flex flex-col divide-y divide-slate-100">
    <PriceTotal />
    <PriceComponent
      v-for="component in components"
      :key="component.id"
      :args="component"
      @delete="deletePriceComponent"
    />
    <GhostPrice />
  </div>
</template>

<script lang="ts" setup>
import PriceComponent from '@/components/Atoms/PriceComponent.vue';
import PriceTotal from '@/components/Atoms/PriceTotal.vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores';
import GhostPrice from '@/components/Atoms/GhostPrice.vue';

const { components } = storeToRefs(useStore());

components.value.push({
  id: '124',
  initialValue: 2.567,
  label: 'Metal Price',
  disposable: true,
});

const deletePriceComponent = (event: any): void => {
  components.value.splice(
    components.value.findIndex(item => item.id === event),
    1,
  );
};
</script>

<style scoped></style>
