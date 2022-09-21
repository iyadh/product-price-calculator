<template>
  <div
    class="relative flex justify-between px-8 py-4"
    @mouseleave="hover = false"
    @mouseover="hover = true"
  >
    <div class="input--wrapper mr-14 flex w-2/4 flex-col">
      <label
        v-if="!persistLabel"
        v-tippy="props.args.label"
        :for="'price-' + props.args.id"
        class="block cursor-pointer overflow-hidden text-ellipsis text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        @click="editPrice"
      >
        {{ props.args.label }}
      </label>
      <input
        v-if="persistLabel"
        :id="'label-' + props.args.id"
        v-model="label"
        class="mr-14 block w-full rounded-md border-2 border-slate-300 py-2 px-3 text-sm leading-5 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        type="text"
        @blur="emits('update', preparePayload())"
      />
      <p v-if="errors.label" class="mt-2 text-xs text-red-400">
        {{ errors.label }}
      </p>
    </div>
    <div class="input--wrapper mr-14 flex w-1/4 flex-col">
      <span
        v-if="!edit"
        v-tippy="props.args.initialValue.toString()"
        class="mr-14 block rounded-md border-2 border-transparent py-2 px-3 text-sm leading-5"
        @click="editPrice"
        >{{ computedPrice }}</span
      >
      <input
        v-if="edit"
        :id="'price-' + props.args.id"
        ref="input"
        v-model="price"
        class="mr-14 block w-full rounded-md border-2 border-slate-300 py-2 px-3 text-sm leading-5 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        type="text"
        @blur="emits('update', preparePayload())"
      />
      <p v-if="errors.price" class="mt-2 text-xs text-red-400">
        {{ errors.price }}
      </p>
    </div>

    <div v-show="hover" class="absolute top-6 right-4 flex justify-end gap-4">
      <button
        v-if="hover && edit"
        :disabled="!validate()"
        @click="emits('update', preparePayload())"
      >
        <CheckIcon
          class="h-5 fill-green-200 transition hover:rotate-[-4deg] hover:fill-green-400"
        />
      </button>
      <button v-if="hover && !edit" @click="editPrice()">
        <PencilSquareIcon
          class="h-5 fill-slate-200 transition hover:rotate-[-4deg] hover:fill-slate-400"
        />
      </button>
      <button
        v-if="hover && props.args.disposable"
        @click="emits('delete', props.args.id)"
      >
        <TrashIcon
          class="h-5 fill-red-200 transition hover:rotate-[-4deg] hover:fill-red-400"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/20/solid';
import type { PriceComponentProps } from '@/types/price-component.type';
import { validateLabel, validatePrice } from '@/types/InputValidation';

const props = withDefaults(defineProps<{ args: PriceComponentProps }>(), {});
const emits = defineEmits<{
  (e: 'delete', id: string): void;
  (e: 'update', payload: { id: string; label?: string; price?: string }): void;
}>();

const hover = ref(false);
const edit = ref(false);
const input = ref(null);
const errors = ref({
  label: '',
  price: '',
});
const price = ref(props.args.initialValue);
const label = ref(props.args.label);

const computedPrice = computed(() => {
  return parseFloat(price.value.toString()).toFixed(2);
});

const persistLabel = computed(() => {
  return props.args.disposable ? edit.value : false;
});

watch([label, price], ([newLabel, newPrice]) => {
  errors.value.label = validateLabel(
    newLabel === label.value ? label.value : newLabel,
  );
  errors.value.price = validatePrice(
    newPrice === price.value ? price.value : newPrice,
  );
});

const editPrice = (): void => {
  edit.value = true;
  // nextTick(() => {
  //   input.value.focus();
  // });
};

const validate = (): boolean => {
  return errors.value.label.length === 0 && errors.value.price.length === 0;
};

const preparePayload = (): any => {
  if (validate()) {
    edit.value = false;
    return {
      id: props.args.id,
      label: label.value.trim().length > 0 ? label.value : props.args.label,
      price: price.value.toString().replace(',', '.'),
    };
  }
};
</script>

<style scoped></style>
