<template>
  <div class="relative flex justify-between px-8 py-4">
    <div class="flex w-2/4 flex-col">
      <input
        v-model="label"
        :class="{ 'text-slate-500': edit, 'text-slate-200': !edit }"
        class="mr-14 block w-full rounded-md border-2 border-slate-100 py-2 px-3 text-sm leading-5 shadow-sm placeholder:text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        placeholder="Label goes here .."
        type="text"
        @focus="edit = true"
      />
      <p v-if="errors.label" class="mt-2 text-xs text-red-400">
        {{ errors.label }}
      </p>
    </div>

    <div class="mr-14 flex w-1/4 flex-col">
      <input
        v-model="price"
        :class="{ 'text-slate-500': edit, 'text-slate-200': !edit }"
        class="block w-full rounded-md border-2 border-slate-100 py-2 px-3 text-sm leading-5 shadow-sm placeholder:text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        type="text"
        @focus="edit = true"
      />
      <p v-if="errors.price" class="mt-2 text-xs text-red-400">
        {{ errors.price }}
      </p>
    </div>

    <div v-if="edit" class="absolute top-6 right-4 flex justify-end gap-4">
      <button @click="addNewPriceComponent()">
        <CheckIcon class="h-5 fill-green-200 transition hover:fill-green-400" />
      </button>
      <button @click="reset">
        <XMarkIcon class="h-5 fill-red-200 transition hover:fill-red-400" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { CheckIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { useStore } from '@/stores';
import { validateLabel, validatePrice } from '@/types/InputValidation';

const { components } = storeToRefs(useStore());

const emits = defineEmits<{
  (e: 'rerender'): void;
}>();

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

const reset = (): void => {
  edit.value = false;
  label.value = '';
  price.value = 0;
  errors.value.label = '';
  errors.value.price = '';
};

const addNewPriceComponent = (): void => {
  if (validate()) {
    components.value.push({
      id: uuidv4(),
      label: label.value,
      initialValue: price.value
        ? parseFloat(price.value.toString().replace(',', '.'))
        : 0.0,
      disposable: true,
    });
    reset();
    emits('rerender');
  }
};
</script>

<style scoped></style>
