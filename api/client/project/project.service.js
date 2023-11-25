import { Project, User } from '../../../db/models';
import { notFound } from '../../../utils/response-utils';

export const getProjects = async (req) => {
  return await Project.find({}, { reviews: 0 });
};

export const getProjectReviewsById = async (req) => {
  const { _id } = req.params;

  const project = await Project.findOne({ _id }, { reviews: 1 });

  const users = await User.find({ _id: { $in: project.reviews.map(x => x.user) } }, { password: 0, validation: 0 });
  const usersMap = {};
  users.forEach(x => usersMap[x._id] = x);

  const reviews = project.reviews.map(x => ({...x, user: usersMap[x.user]}))

  return reviews;
};

export const addProjectReviewById = async (req) => {
  const { _id } = req.params;
  const { text } = req.body;

  const project = await Project.findOne({ _id });

  const newReview = {
    user: req.user._id,
    text,
    createdDate: new Date().toISOString(),
    answer: null,
    answerDate: null,
  }

  project.reviews.push(newReview);

  await project.save();

  return newReview;
};
