import express from 'express';
import Product from '../models/Product';
import {ProductTypes} from '../types';
import auth, {RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    let products: ProductTypes[];
    const categoryId = req.query.category as string;

    if (categoryId) {
      products = await Product.find({category: categoryId}, {user: 0, description: 0, category: 0});
    } else {
      products = await Product.find({}, {user: 0, description: 0, category: 0});
    }

    return res.send(products);
  } catch (error) {
    return next(error);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(404).send({error: 'Id не найдено!'});
    }

    const product = await Product.findById(productId).populate({
      path: 'user',
      select: '-token -username'
    }).populate('category');

    if (!product) {
      return res.status(404).send({error: 'Продукт не найден!'});
    }

    return res.send(product);
  } catch (error) {
    return next(error);
  }
});

productsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const productData = new Product({
      user: req.user?._id,
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      price: parseFloat(req.body.price),
      image: req.file?.filename,
    });

    await productData.save();
    return res.send(productData);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

productsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({error: 'Продукт не найден!'});
    }

    if (product.user.toString() !== req.user?._id.toString()) {
      return res.status(403).send({error: 'У Вас нет прав для удаления данного продукта!'});
    }

    await Product.findByIdAndDelete(product);
    return res.send({message: 'Продукт, успешно удален!'});
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;