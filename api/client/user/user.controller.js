import { Router } from 'express';
import CommonError from '../../library/error';
import { authMid } from '../../middlewares/auth.middleware';

const api = Router();

api.get('/user/me', [authMid], async (req, res) => {
  try {
    return res.json(req.user);
  } catch (err) {
    return CommonError(req, err, res);
  }
});

module.exports = api;
