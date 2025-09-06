export interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export type TRole =  "ADMIN" | "AGENT" |"USER";
