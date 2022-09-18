<template>
  <div
    class="relative flex justify-between px-8 py-4"
    @mouseleave="hover = false"
    @mouseover="hover = true"
  >
    <div class="input--wrapper w-2/4 mr-14 flex flex-col">
      <label
        v-if="!persistLabel"
        v-tippy="props.args.label"
        :for="'price-' + props.args.id"
        class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 cursor-pointer text-ellipsis overflow-hidden"
        @click="editPrice"
      >
        {{ props.args.label }}
      </label>
      <input
        v-if="persistLabel"
        :id="'label-' + props.args.id"
        v-model="label"
        class="w-full block rounded-md text-sm leading-5 py-2 px-3 mr-14 border-2 border-slate-300 shadow-sm focus:outline-none focus:ring focus:border-indigo-500 focus:ring-indigo-200"
        type="text"
        @blur="updatePriceComponent"
      />
      <p v-if="errors.label" class="mt-2 text-xs text-red-400">
        {{ errors.label }}
      </p>
    </div>
    <div class="input--wrapper w-1/4 mr-14 flex flex-col">
      <span
        v-if="!edit"
        v-tippy="props.args.initialValue.toString()"
        class="block rounded-md text-sm leading-5 py-2 px-3 mr-14 border-2 border-transparent"
        @click="editPrice"
        >{{ computedPrice }}</span
      >
      <input
        v-if="edit"
        :id="'price-' + props.args.id"
        ref="input"
        v-model="price"
        class="w-full block rounded-md text-sm leading-5 py-2 px-3 mr-14 border-2 border-slate-300 shadow-sm focus:outline-none focus:ring focus:border-indigo-500 focus:ring-indigo-200"
        type="text"
        @blur="updatePriceComponent"
      />
      <p v-if="errors.price" class="mt-2 text-xs text-red-400">
        {{ errors.price }}
      </p>
    </div>

    <div v-show="hover" class="absolute top-6 right-4 flex justify-end gap-4">
      <button
        v-if="hover && edit"
        :disabled="!validate()"
        @click="updatePriceComponent"
      >
        <CheckIcon
          class="h-5 fill-green-200 transition hover:fill-green-400 hover:rotate-[-4deg]"
        />
      </button>
      <button v-if="hover && !edit" @click="editPrice()">
        <PencilSquareIcon
          class="h-5 fill-slate-200 transition hover:fill-slate-400 hover:rotate-[-4deg]"
        />
      </button>
      <button
        v-if="hover && props.args.disposable"
        @click="emits('delete', props.args.id)"
      >
        <TrashIcon
          class="h-5 fill-red-200 transition hover:fill-red-400 hover:rotate-[-4deg]"
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
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores';
import { validateLabel, validatePrice } from '@/types/InputValidation';

const { components } = storeToRefs(useStore());

const hover = ref(false);
const edit = ref(false);
const input = ref(null);
const errors = ref({
  label: '',
  price: '',
});

const props = withDefaults(defineProps<{ args: PriceComponentProps }>(), {});
const emits = defineEmits<{
  (e: 'delete', id: string): void;
}>();

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

const editPrice = () => {
  edit.value = true;
  // nextTick(() => {
  //   input.value.focus();
  // });
};

const validate = () => {
  return errors.value.label.length === 0 && errors.value.price.length === 0;
};

const updatePriceComponent = () => {
  const index = components.value.findIndex(
    (item: PriceComponentProps) => item.id === props.args.id,
  );
  if (validate()) {
    components.value[index].label =
      label.value.trim().length > 0
        ? label.value
        : components.value[index].label;
    components.value[index].initialValue = parseFloat(
      price.value.toString().replace(',', '.'),
    );
    edit.value = false;
  }
};
</script>

<style scoped></style>
