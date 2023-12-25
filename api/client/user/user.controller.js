import { Router } from 'express';
import CommonError from '../../library/error';
import { authMid } from '../../middlewares/auth.middleware';
import { adminMid } from '../../middlewares/admin.middleware';
import { getAll, getRating } from './user.service';

const api = Router();

api.get('/users/me', [authMid], async (req, res) => {
  try {
    return res.json(req.user);
  } catch (err) {
    return CommonError(req, err, res);
  }
});

api.get('/users', [authMid, adminMid], async (req, res) => {
  try {
    const users = await getAll();
    return res.json(users);
  } catch (err) {
    return CommonError(req, err, res);
  }
})

api.get('/users/rating', [], async (req, res) => {
  try {
    const users = await getRating(req);
    return res.json(users);
  } catch (err) {
    return CommonError(req, err, res);
  }
})

module.exports = api;
