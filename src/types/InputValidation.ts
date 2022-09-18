export const validateLabel = (label: string): string => {
  console.log('validateLabel', label);
  return label.trim().length >= 1
    ? ''
    : 'Label must have at least one character.';
};

export const validatePrice = (value: number): string => {
  const regex: RegExp = /^\d*((\.)?|(,)?)(\d*)?$/g;
  return regex.test(value.toString())
    ? ''
    : 'Price must be a (positive) number.';
};
