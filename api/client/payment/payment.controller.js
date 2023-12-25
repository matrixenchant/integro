import { Router } from 'express';
import CommonError from '../../library/error';
import { authMid } from '../../middlewares/auth.middleware';
import { adminMid } from '../../middlewares/admin.middleware';
import { closePaymentById, createPayment, getAll, getUserPayments } from './payment.service';

const api = Router();

api.get('/payments/all', [authMid, adminMid], async (req, res) => {
  try {
    const result = await getAll(req);
    return res.json(result);
  } catch (err) {
    return CommonError(req, err, res);
  }
});

api.get('/payments', [authMid], async (req, res) => {
  try {
    const result = await getUserPayments(req);
    return res.json(result);
  } catch (err) {
    return CommonError(req, err, res);
  }
});

api.post('/payments/close', [authMid], async (req, res) => {
  try {
    const result = await closePaymentById(req);
    return res.json(result);
  } catch (err) {
    return CommonError(req, err, res);
  }
});

api.post('/payments', [authMid], async (req, res) => {
  try {
    const result = await createPayment(req);
    return res.json(result);
  } catch (err) {
    return CommonError(req, err, res);
  }
});

module.exports = api;
