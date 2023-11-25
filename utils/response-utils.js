const ResponseError = ({ message, code = 500 }) => {
  const err = new Error(message);
  err.code = code;

  err.toJSON = {
    success: false,
    code: code,
    message: message,
  };
  return err;
};

exports.unauthorized = (msg) =>
  ResponseError({
    code: 401,
    message: msg || 'AUTH.ERROR.NOT_LOGGED_IN',
  });

exports.badRequest = (msg) =>
  ResponseError({
    code: 400,
    message: msg || 'BAD_REQUEST',
  });

exports.notFound = (msg) =>
  ResponseError({
    code: 404,
    message: msg || 'NOT_FOUND',
  });

exports.forbidden = (msg) =>
  ResponseError({
    code: 403,
    message: msg || 'FORBIDDEN',
  });

exports.serverError = (msg) =>
  ResponseError({
    code: 500,
    message: msg || 'INTERNAL_SERVER_ERROR',
  });

exports.tooMany = (msg) =>
  ResponseError({
    code: 429,
    message: msg || 'TOO_MANY_REQUESTS',
  });
