export const convertTaka = (paisa: number): string => {
  return (paisa / 100).toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};
