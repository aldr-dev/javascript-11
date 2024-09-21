import mongoose from 'mongoose';
import {CategoryFields} from '../types';

const CategorySchema = new mongoose.Schema<CategoryFields>({
  title: {
    type: String,
    required: [true, 'Категория обязательна!'],
    unique: true,
    enum: {
      values: ['Велосипеды', 'Цветы', 'Одежда', 'Машины'],
      message: 'Неизвестная категория!',
    },
  },
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;