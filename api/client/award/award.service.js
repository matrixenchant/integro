import { Award, Payment, User } from '../../../db/models';
import { badRequest, forbidden, notFound } from '../../../utils/response-utils';

export const getShopAwards = async (req) => {
  return await Award.find({ project: null }).sort({ createdAt: -1 });
}

export const createAward = async (req) => {
  const { project, name, description, collection, variants, cost, quantity } = req.body;

  // TODO: Validation

  const award = new Award({
    project,
    name,
    description,
    collection,
    variants,
    cost,
    quantity
  });

  await award.save();

  return award;
};

export const updateAward = async (req) => {
  const award = req.body;

  try {
    const data = await Award.findOne({ _id: award._id });
    if (!data) throw notFound('AWARD.ERROR.NOT_FOUND');

    ['project', 'name', 'description', 'collection', 'variants', 'cost', 'quantity'].forEach(
      (fieldName) => {
        data[fieldName] = award[fieldName] ?? data[fieldName];
      }
    );

    const newData = await data.save();
    return newData;
  } catch (e) {
    throw e;
  }
};


export const buyAward = async (req) => {
  const { award, variant: variantIndex } = req.body;
  const user = req.user;

  try {

    const $award = await Award.findOne({ _id: award._id });
    if (!$award) throw notFound('AWARD.ERROR.NOT_FOUND');

    const cost = Math.round($award.cost / 2);
    const variant = $award.variants[variantIndex];

    if (user.balance < cost) throw forbidden('AWARD.ERROR.NOT_ENOUGH_BALANCE');
    if (!variant || variant.quantity <= 0) throw forbidden('AWARD.ERROR.EMPTY')

    const $user = await User.findOne({ _id: user._id });

    $user.balance -= cost;
    $award.variants = $award.variants.map((x, i) => i === variantIndex ? ({...x, quantity: x.quantity - 1 }) : x);

    const $payment = new Payment({
      user: user._id,
      info: {
        award,
        variant,
        type: 'shop'
      },
      projectId: null,
      price: cost,
    });

    await $payment.save();

    $user.awards.push({
      award: $award._id,
      variant: variant.type,
      payment: $payment._id
    })

    await $user.save();
    await $award.save();

    return true;
  } catch (e) {
    throw e;
  }
}