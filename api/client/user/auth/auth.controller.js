import { Router } from 'express';
import { login, register } from '../user.service';
import CommonError from '../../../library/error';

const api = Router();

api.post('/auth/login', [], async (req, res) => {
  try {
    const results = await login(req.body);
    return res.json(results);
  } catch (err) {
    return CommonError(req, err, res);
  }
});

api.post('/auth/register', [], async (req, res) => {
  try {
    const results = await register(req.body);
    return res.json(results);
  } catch (err) {
    return CommonError(req, err, res);
  }
});

module.exports = api;
