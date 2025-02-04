import { ResponseStatusCode } from "~/enums/base";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  if (!formData || formData.length === 0)
    return {
      status: {
        code: ResponseStatusCode.INTERNAL_SERVER_ERROR,
        errorCode: null,
        errorMessage: "No file uploaded",
        warningMessage: null,
        requestId: "",
        requestTime: 0,
      },
      data: null,
    };

  const file = formData[0];
  const newFormData = new FormData();
  newFormData.append(
    "file",
    new File([file.data], file.filename ?? "", { type: file.type }),
    file.filename,
  );
  // return await api(
  //   "/files/upload",
  //   {
  //     method: "POST",
  //     body: newFormData,
  //     timeout: 60000,
  //   },
  //   event,
  // );
  return {
    status: {
      code: "0",
      errorCode: "string",
      errorMessage: "string",
      warningMessage: "string",
      requestId: "string",
      requestTime: 0,
    },
    data: file.filename,
  };
});
