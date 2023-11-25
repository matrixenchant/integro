import { Router } from 'express';
import CommonError from '../../library/error';
import { authMid } from '../../middlewares/auth.middleware';
import { closePaymentById, createPayment, getUserPayments } from './payment.service';

const api = Router();

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
