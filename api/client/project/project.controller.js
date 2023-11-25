import { Router } from 'express';
import CommonError from '../../library/error';
import { authMid } from '../../middlewares/auth.middleware';
import { addProjectReviewById, getProjectReviewsById, getProjects } from './project.service';

const api = Router();

api.get('/projects', [], async (req, res) => {
  try {
    const result = await getProjects(req);
    return res.json(result);
  } catch (err) {
    return CommonError(req, err, res);
  }
});

api.get('/projects/:_id/reviews', [], async (req, res) => {
  try {
    const result = await getProjectReviewsById(req);
    return res.json(result);
  } catch (err) {
    return CommonError(req, err, res);
  }
});

api.post('/projects/:_id/reviews', [authMid], async (req, res) => {
  try {
    const result = await addProjectReviewById(req);
    return res.json(result);
  } catch (err) {
    return CommonError(req, err, res);
  }
});

module.exports = api;
