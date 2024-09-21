import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {Product, ProductInfo, ProductMutation, ValidationError} from '../../types';
import axiosApi from '../../axiosApi';
import {isAxiosError} from 'axios';

export const sendProductData = createAsyncThunk<void, ProductMutation, {state: RootState, rejectValue: ValidationError}>(
  'products/sendProductData', async (product, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;

      if (!token) {
        return;
      }

      const formData = new FormData();
      formData.append('category', product.category);
      formData.append('title', product.title);
      formData.append('description', product.description);
      formData.append('price', product.price);

      if (product.image) {
        formData.append('image', product.image);
      }

      await axiosApi.post<ProductMutation>('/products', formData, {headers: {'Authorization': `Bearer ${token}`}});
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  });

export const fetchProducts = createAsyncThunk<Product[], void, {state: RootState}>(
  'products/fetchProducts', async () => {
    const {data: productsData} = await axiosApi.get<Product[]>('/products');
    return productsData;
  });

export const filterByCategory = createAsyncThunk<Product[], string, {state: RootState}>(
  'products/filterByCategory', async (categoryId) => {
    const {data: productsData} = await axiosApi.get<Product[]>(`/products?category=${categoryId}`);
    return productsData;
  });

export const fetchOneProduct = createAsyncThunk<ProductInfo, string, {state: RootState}>(
  'products/fetchOneProduct', async (id) => {
    const {data: oneProduct} = await axiosApi.get<ProductInfo>(`/products/${id}`);
    return oneProduct;
  });

export const deleteProduct = createAsyncThunk<void, string, {state: RootState}>(
  'products/deleteProduct', async (id, {getState}) => {
    const token = getState().users.user?.token;

    if (!token) {
      return;
    }

    await axiosApi.delete(`/products/${id}`, {headers: {'Authorization': `Bearer ${token}`}});
  });