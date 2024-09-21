import mongoose, {Schema, Types} from 'mongoose';
import User from './User';
import Category from './Category';
import {ProductsFields} from '../types';

const ProductSchema = new mongoose.Schema<ProductsFields>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'Пользователь не найден!',
    }
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const category = await Category.findById(value);
        return Boolean(category);
      },
      message: 'Категория не найдена!',
    }
  },
  title: {
    type: String,
    required: [true, 'Поле заголовок является обязательным!'],
  },
  description: {
    type: String,
    required: [true, 'Поле описание является обязательным!'],
  },
  price: {
    type: Number,
    required: [true, 'Поле цена является обязательным!'],
    validate: {
      validator: async (value: number) => {
        return Boolean(value >= 0);
      },
      message: 'Текущая цена не может быть ниже нуля!',
    },
  },
  image: {
    type: String,
    required: [true, 'Поле изображение является обязательным!'],
  },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;