const jwt = require('jsonwebtoken');
const { notFound, unauthorized } = require('../../utils/response-utils');
const { default: CommonError } = require('../library/error');
const { User } = require('../../db/models');

export const authMid = async (req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) throw unauthorized();

    const decoded = jwt.verify(token, process.env['JWTSECRET']);

    const user = await User.findOne({ _id: decoded.userId }, { password: 0, validation: 0 });
    if (!user) throw unauthorized('AUTH.ERROR.BAD_JWT');

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    if (err.message === 'invalid token' || err.message === 'jwt malformed' || err.message === 'jwt expired') return CommonError(req, unauthorized('AUTH.ERROR.BAD_JWT'), res);
    return CommonError(req, err, res);
  }
};
