<template>
  <div class="relative flex justify-between px-8 py-4">
    <input
      v-model="label"
      :class="{ 'text-slate-500': edit, 'text-slate-200': !edit }"
      class="w-2/4 block rounded-md text-sm leading-5 py-2 px-3 mr-14 border-2 border-slate-100 shadow-sm focus:outline-none focus:ring focus:border-indigo-500 focus:ring-indigo-200 placeholder:text-slate-200"
      placeholder="Label goes here .."
      type="text"
      @focus="edit = true"
    />
    <input
      v-model="price"
      :class="{ 'text-slate-500': edit, 'text-slate-200': !edit }"
      class="w-1/4 block rounded-md text-sm leading-5 py-2 px-3 mr-14 border-2 border-slate-100 shadow-sm focus:outline-none focus:ring focus:border-indigo-500 focus:ring-indigo-200 placeholder:text-slate-200"
      type="text"
      @focus="edit = true"
    />
    <div v-if="edit" class="absolute top-6 right-4 flex justify-end gap-4">
      <button @click="addNewPriceComponent()">
        <CheckIcon
          class="h-5 fill-green-200 transition hover:fill-green-400 hover:rotate-[-4deg]"
        />
      </button>
      <button @click="reset">
        <XMarkIcon
          class="h-5 fill-red-200 transition hover:fill-red-400 hover:rotate-[-4deg]"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CheckIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores';

const { components } = storeToRefs(useStore());

const edit = ref(false);
const label = ref('');
const price = ref(0);

const addNewPriceComponent = () => {
  components.value.push({
    id: (components.value.length + 1).toString(),
    label: label.value,
    initialValue: price.value,
    disposable: true,
  });
  reset();
};
const reset = () => {
  edit.value = false;
  label.value = '';
  price.value = 0;
};
</script>

<style scoped></style>
