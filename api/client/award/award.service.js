import { Award, Project, User } from '../../../db/models';
import { badRequest, notFound } from '../../../utils/response-utils';

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
