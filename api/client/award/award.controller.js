import { Router } from 'express';
import CommonError from '../../library/error';
import { authMid } from '../../middlewares/auth.middleware';
import { adminMid } from '../../middlewares/admin.middleware';
import { createAward, getShopAwards, updateAward } from './award.service';

const api = Router();

api.get('/awards/shop', [], async (req, res) => {
  try {
    const result = await getShopAwards(req);
    return res.json(result);
  } catch (err) {
    return CommonError(req, err, res);
  }
});

api.post('/awards', [authMid, adminMid], async (req, res) => {
  try {
    const result = await createAward(req);
    return res.json(result);
  } catch (err) {
    return CommonError(req, err, res);
  }
});

api.put('/awards', [authMid, adminMid], async (req, res) => {
  try {
    const result = await updateAward(req);
    return res.json(result);
  } catch (err) {
    return CommonError(req, err, res);
  }
});

module.exports = api;
