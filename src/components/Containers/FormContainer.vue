<template>
  <div class="flex flex-col divide-y divide-slate-100">
    <PriceTotal />
    <PriceComponent
      v-for="component in components"
      :key="component.id"
      :args="component"
      @delete="deletePriceComponent"
    />
    <GhostPrice :key="labelErrorRenderKey" @rerender="forceRerender" />
  </div>
</template>

<script lang="ts" setup>
import PriceComponent from '@/components/Atoms/PriceComponent.vue';
import PriceTotal from '@/components/Atoms/PriceTotal.vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores';
import GhostPrice from '@/components/Atoms/GhostPrice.vue';
import { ref } from 'vue';

const { components } = storeToRefs(useStore());
const labelErrorRenderKey = ref(0);

const deletePriceComponent = (event: any): void => {
  components.value.splice(
    components.value.findIndex(item => item.id === event),
    1,
  );
};

// Forces the GhostPrice component to rerender after adding the new values
const forceRerender = (): void => {
  labelErrorRenderKey.value += 1;
};
</script>

<style scoped></style>
