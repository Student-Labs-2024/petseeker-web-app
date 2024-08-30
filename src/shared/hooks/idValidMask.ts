export const validateMask = (value: string, mask: string) => {
  return value.length === mask.replace(/[^0-9]/g, "").length;
};
