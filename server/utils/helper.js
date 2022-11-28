export const createError = (status, message) => {
  const err = new Error()

  err.status = status;
  err.message = message;

  return err;
}

export const responseError = (message) => {
  return {
    status: 500,
    data: [], 
    message: message
  }
}

export const responseSuccess = (data, message) => {
  let dataArr = Array.isArray(data) ? data : [data]
  return {
    status: 200,
    data: dataArr, 
    message: message
  }
}