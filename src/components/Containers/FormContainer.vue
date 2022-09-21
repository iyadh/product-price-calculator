<template>
  <div class="flex flex-col divide-y divide-slate-100">
    <PriceTotal />
    <PriceComponent
      v-for="component in components"
      :key="component.id"
      :args="component"
      @delete="deletePriceComponent"
      @update="updatePriceComponent"
    />
    <GhostPrice :key="labelErrorRenderKey" @rerender="forceRerender" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores';
import PriceComponent from '@/components/Atoms/PriceComponent.vue';
import PriceTotal from '@/components/Atoms/PriceTotal.vue';
import GhostPrice from '@/components/Atoms/GhostPrice.vue';
import type { PriceComponentProps } from '@/types/price-component.type';

const { components } = storeToRefs(useStore());
const labelErrorRenderKey = ref(0);

const deletePriceComponent = (event: string): void => {
  components.value.splice(
    components.value.findIndex(item => item.id === event),
    1,
  );
};

const updatePriceComponent = (event: any): void => {
  const index = components.value.findIndex(
    (item: PriceComponentProps) => item.id === event.id,
  );
  components.value[index].label = event.label;
  components.value[index].initialValue = event.price;
};

// Forces the GhostPrice component to rerender after adding the new values
const forceRerender = (): void => {
  labelErrorRenderKey.value += 1;
};
</script>

<style scoped></style>
