import type { IResponse } from "@/types/global.types";
export const getTotalDataWithPages = <T>(
  response: IResponse<T[]> | undefined
) => {
  const data = response?.data || [];
  const total = response?.meta?.total || 1;
  const totalPages = response?.meta?.totalPages || 1;
  return [data, total, totalPages] as const;
};
