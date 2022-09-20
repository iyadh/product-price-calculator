import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import type { PriceComponentProps } from '@/types/price-component.type';

export const useStore = defineStore('components', () => {
  const components = ref<Array<PriceComponentProps>>([
    {
      id: uuidv4(),
      initialValue: 1,
      label: 'Base Price',
      disposable: false,
    },
  ]);
  const totalPrice = computed(() => {
    return components.value.reduce(
      (prev: number, next: PriceComponentProps) =>
        (prev += +next.initialValue.toString()),
      0,
    );
  });
  return { components, totalPrice };
});
