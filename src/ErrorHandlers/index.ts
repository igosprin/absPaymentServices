const statusCode = {
  400: "Bad Request",
  404: "Not Found",
  405: "Method Not Allowed",
  500: "Internal Server Error",
  422: "Unprocessable Entity",
};

function showError(error, msg = "") {
  return structError(error, msg);
}

function structError(error, msg) {
  let result: any = { status: false };
  let errorCode = 0;
  if (!statusCode[error.status]) error.status = 500;
  errorCode = error.status;
  if (msg != "") result.error = msg;
  else result.error = statusCode[error.status];
  return { code: errorCode, show: result };
}

function myError(status, msg = "") {
  let result: any = { status: false };
  if (!statusCode[status]) status = 500;

  if (msg != "") result.error = msg;
  else result.error = statusCode[status];
  return result;
}

function myError422(errors = []) {
  let result: any = { status: false };
  if (errors.length > 0) result.errors = errors;
  else {
    result.errors = [];
    result.errors.push({ 422: statusCode[422] });
  }
  return result;
}


export {
  statusCode, showError, structError, myError, myError422
}