export const convertTaka = (paisa: number): string => {
  return (paisa / 100).toLocaleString();
};
