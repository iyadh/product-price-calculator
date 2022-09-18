export interface InputValidation {
  label: string;
  price: string;
}

export const validateLabel = (label: string) => {
  return label.trim().length > 1
    ? ''
    : 'Label must have at least one character.';
};

export const validatePrice = (value: number) => {
  const regex: RegExp = /^\d*((\.)?|(\,)?)(\d*)?$/g;
  return regex.test(value.toString())
    ? ''
    : 'Price must be a (positive) number.';
};
