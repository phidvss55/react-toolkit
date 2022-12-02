export const createError = (status, message) => {
  const err = new Error()

  err.status = status;
  err.message = message;

  return err;
}

export const responseError = (message) => {
  return {
    status: 500,
    message: message,
    data: [], 
  }
}

export const responseSuccess = (data, message) => {
  let dataArr = Array.isArray(data) ? data : [data]
  return {
    status: 200,
    message: message,
    data: dataArr, 
  }
}