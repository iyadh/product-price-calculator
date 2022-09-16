<template>
  <div
    class="relative flex justify-between gap-4 px-8 py-4"
    @mouseleave="hover = false"
    @mouseover="hover = true"
  >
    <label
      :for="'price-' + props.args.id"
      class="w-2/4 block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 cursor-pointer"
      @click="filterValue"
      >{{ props.args.label }}</label
    >
    <button v-show="hover" class="absolute top-6 right-80">
      <PencilSquareIcon
        class="h-5 fill-slate-600 transition hover:fill-slate-400 hover:rotate-[-4deg]"
      />
    </button>
    <span
      v-if="!edit"
      class="w-1/4 block rounded-md text-sm leading-5 py-2 px-3 mr-10 border-2 border-slate-300 shadow-sm"
      >{{ computedPrice }}</span
    >
    <input
      v-if="edit"
      :id="'price-' + props.args.id"
      v-model="price"
      class="w-1/4 block rounded-md text-sm leading-5 py-2 px-3 mr-10 border-2 border-slate-300 shadow-sm focus:outline-none focus:ring focus:border-indigo-500 focus:ring-indigo-200"
      type="text"
      @blur="edit = false"
    />
    <button
      v-if="hover && props.args.disposable"
      class="absolute top-6 right-8"
    >
      <TrashIcon
        class="h-5 fill-red-200 transition hover:fill-red-400 hover:rotate-[-4deg]"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid';
import type { PriceComponentProps } from '@/types/price-component.type';

const hover = ref(false);
const edit = ref(false);
// Workaround for typed props from here: https://github.com/vuejs/core/issues/4294#issuecomment-984033739
const props = withDefaults(defineProps<{ args: PriceComponentProps }>(), {});
const price = ref(props.args.initialValue);
const computedPrice = computed(() => {
  return parseFloat(price.value.toString()).toFixed(2);
});
const filterValue = () => {
  console.log('filterValue');
  edit.value = true;
};
</script>

<style scoped></style>
