export const validateLabel = (label: string): string => {
  return label.trim().length >= 1
    ? ''
    : 'Label must have at least one character.';
};

export const validatePrice = (value: number): string => {
  const regex: RegExp = /^\d*((\.)?|(,)?)(\d*)?$/g;
  return value.toString().length > 0 && regex.test(value.toString())
    ? ''
    : 'Price must be a (positive) number.';
};
