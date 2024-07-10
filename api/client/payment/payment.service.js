import { Payment, Project, User } from '../../../db/models';
import { badRequest, notFound } from '../../../utils/response-utils';
import { checkRank } from '../user/user.service';

export const getUserPayments = async (req) => {
  const { _id } = req.user;

  return await Payment.find({ user: _id }).sort({ createdAt: -1 });
};

export const getAll = async (req) => {
  return await Payment.find().sort({ createdAt: -1 });
}

export const closePaymentById = async (req) => {
  const { paymentId, donate } = req.body;

  const userId = req.user.role === 'admin' && req.body.userId ? req.body.userId : req.user._id

  const payment = await Payment.findOne({ user: userId, _id: paymentId });
  if (!payment) throw notFound('PAYMENT.ERROR.NOT_EXIST');
  if (payment.status === 'confirm' || payment.status === 'rejected')
    throw badRequest('PAYMENT.ERROR.ALREADY_CLOSED');


  let price = payment.price;
  if (price === -1) {
    console.log('DONATE Payment: ', donate);

    payment.price = +donate;
    price = +donate;
  }

  const project = await Project.findOne({ _id: payment.projectId });
  const user = await User.findOne({ _id: userId });

  project.current += price;
  project.donations += 1;
  await project.save();

  const additive = Math.round(price * 0.07)
  user.balance += additive;

  user.donationsNum += 1;
  user.donations += price;

  user.rank = checkRank(user.donations);
  console.log(`NEW RANK: ${user.rank}`);

  // user.awards.push(payment.info.award);

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
