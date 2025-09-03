export type ResponseBody<T> = {
  status: {
    code: string;
    errorCode: string;
    errorMessage: string;
    warningMessage: string;
    requestId: string;
    requestTime: number;
  };
  data: T;
};
