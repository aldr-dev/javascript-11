import express from 'express';
import Category from '../models/Category';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (_, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (error) {
    return next(error);
  }
});

export default categoriesRouter;