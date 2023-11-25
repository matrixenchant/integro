import { Payment, Project } from '../../../db/models';
import { notFound } from '../../../utils/response-utils';

export const getUserPayments = async (req) => {
  const { _id } = req.user;

  return await Payment.find({ user: _id });
};

export const closePaymentById = async (req) => {
  const { paymentId } = req.body;

  const payment = await Payment.findOne({ user: req.user._id, _id: paymentId });
  if (!payment) throw notFound('PAYMENT.ERROR.NOT_EXIST');

  const project = await Project.findOne({ _id: payment.info.projectId });
  project.current += payment.info.award.price;
  await project.save();

  payment.status = 'confirm';

  await payment.save();

  return payment;
};

export const createPayment = async (req) => {
  const { info, projectId, price } = req.body;

  const payment = new Payment({
    user: req.user._id,
    info,
    projectId,
    price
  });

  await payment.save();

  return payment;
};
