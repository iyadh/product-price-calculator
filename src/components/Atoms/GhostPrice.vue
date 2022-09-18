<template>
  <div class="relative flex justify-between px-8 py-4">
    <div class="w-2/4 flex flex-col">
      <input
        v-model="label"
        :class="{ 'text-slate-500': edit, 'text-slate-200': !edit }"
        class="w-full block rounded-md text-sm leading-5 py-2 px-3 mr-14 border-2 border-slate-100 shadow-sm focus:outline-none focus:ring focus:border-indigo-500 focus:ring-indigo-200 placeholder:text-slate-200"
        placeholder="Label goes here .."
        type="text"
        @focus="edit = true"
      />
      <p v-if="errors.label" class="mt-2 text-xs text-red-400">
        {{ errors.label }}
      </p>
    </div>

    <div class="w-1/4 mr-14 flex flex-col">
      <input
        v-model="price"
        :class="{ 'text-slate-500': edit, 'text-slate-200': !edit }"
        class="w-full block rounded-md text-sm leading-5 py-2 px-3 border-2 border-slate-100 shadow-sm focus:outline-none focus:ring focus:border-indigo-500 focus:ring-indigo-200 placeholder:text-slate-200"
        type="text"
        @focus="edit = true"
      />
      <p v-if="errors.price" class="mt-2 text-xs text-red-400">
        {{ errors.price }}
      </p>
    </div>

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
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { CheckIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { useStore } from '@/stores';
import { validateLabel, validatePrice } from '@/types/InputValidation';

const { components } = storeToRefs(useStore());

const edit = ref(false);
const label = ref('');
const price = ref(0);
const errors = ref({
  label: '',
  price: '',
});

watch([label, price], ([newLabel, newPrice]) => {
  errors.value.label = validateLabel(
    newLabel === label.value ? label.value : newLabel,
  );
  errors.value.price = validatePrice(
    newPrice === price.value ? price.value : newPrice,
  );
});

const validate = (): boolean => {
  return errors.value.label.length === 0 && errors.value.price.length === 0;
};

const addNewPriceComponent = (): void => {
  if (validate()) {
    components.value.push({
      id: (components.value.length + 1).toString(),
      label: label.value,
      initialValue: parseFloat(price.value.toString().replace(',', '.')),
      disposable: true,
    });
    reset();
  }
};
const reset = (): void => {
  edit.value = false;
  label.value = '';
  price.value = 0;
  errors.value.label = '';
  errors.value.price = '';
};
</script>

<style scoped></style>
