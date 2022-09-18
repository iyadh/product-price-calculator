import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { PriceComponentProps } from '@/types/price-component.type';

export const useStore = defineStore('components', () => {
  const components = ref<Array<PriceComponentProps>>([
    {
      id: '123',
      initialValue: 1,
      label: 'Base Price',
      disposable: false,
    },
  ]);
  const totalPrice = computed(() => {
    return components.value.reduce(
      (prev: any, next: any) => (prev += +next.initialValue.toString()),
      0,
    );
  });
  return { components, totalPrice };
});
