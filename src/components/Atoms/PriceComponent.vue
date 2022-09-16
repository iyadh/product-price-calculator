<template>
  <div class="flex justify-between gap-4 px-8 py-4">
    <label
      :for="'price' + props.key"
      class="w-2/4 block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >{{ props.label }}</label
    >
    <button>
      <PencilSquareIcon
        class="h-5 fill-slate-600 transition hover:fill-slate-400 hover:rotate-[-4deg]"
      />
    </button>

    <input
      :id="'price' + props.key"
      v-model="props.initialValue"
      class="w-1/4 block rounded-md text-sm leading-5 py-2 px-3 border-2 border-slate-300 shadow-sm focus:outline-none focus:ring focus:border-indigo-500 focus:ring-indigo-200"
      type="text"
    />
    <button>
      <TrashIcon
        v-show="props.disposable"
        class="h-5 fill-red-200 transition hover:fill-red-400 hover:rotate-[-4deg]"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid';
import type { PriceComponentProps } from '@/types/price-component.type';

// Workaround for typed props from here: https://github.com/vuejs/core/issues/4294#issuecomment-984033739
const props = withDefaults(defineProps<PriceComponentProps>(), {});
</script>

<style scoped></style>
