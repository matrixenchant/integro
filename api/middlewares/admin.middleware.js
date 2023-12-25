const { forbidden } = require('../../utils/response-utils');
const { default: CommonError } = require('../library/error');

export const adminMid = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== 'admin') throw forbidden('AUTH.ERROR.FORBIDDEN');

    next();
  } catch (err) {
    return CommonError(req, err, res);
  }
};
