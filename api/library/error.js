import { badRequest, notFound, serverError } from '../../utils/response-utils';

const CommonError = (req, err, res) => {
  console.log(`${req.method.toUpperCase()}: <${req.originalUrl}> `, err.message);

  if (err.code) return res.status(err.code).json(err.toJSON);

  // if (/must not be/.test(err.message) || /must be/.test(err.message))
  //   return res.json(badRequest(err.message));
  // if (/not found/.test(err.message)) return res.json(notFound(err.message));

  return res.status(500).json({
    success: false,
    code: 500,
    message: 'INTERNAL_SERVER_ERROR'
  });
};

export default CommonError;
