import { Payment, Project, User } from '../../../db/models';
import { badRequest, notFound } from '../../../utils/response-utils';

export const getUserPayments = async (req) => {
  const { _id } = req.user;

  return await Payment.find({ user: _id }).sort({ createdAt: -1 });
};

export const closePaymentById = async (req) => {
  const { paymentId } = req.body;

  const payment = await Payment.findOne({ user: req.user._id, _id: paymentId });
  if (!payment) throw notFound('PAYMENT.ERROR.NOT_EXIST');
  if (payment.status === 'confirm' || payment.status === 'rejected')
    throw badRequest('PAYMENT.ERROR.ALREADY_CLOSED');

  const project = await Project.findOne({ _id: payment.projectId });
  project.current += payment.price;
  project.donations += 1;
  await project.save();

  const user = await User.findOne({ _id: req.user._id });

  const additive = Math.round(payment.price * 0.1)
  user.balance += additive;
  user.overallBalance += additive;

  user.donations += 1;
  user.awards.push(payment.info.award);
  await user.save();

  payment.status = 'confirm';

  await payment.save();

  return { payment, user };
};

export const createPayment = async (req) => {
  const { info, projectId, price } = req.body;

  const payment = new Payment({
    user: req.user._id,
    info,
    projectId,
    price,
  });

  await payment.save();

  return payment;
};
