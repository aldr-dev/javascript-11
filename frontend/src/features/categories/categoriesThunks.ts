import {createAsyncThunk} from '@reduxjs/toolkit';
import {Category} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';

export const getCategoriesData = createAsyncThunk<Category[], void, {state: RootState}>(
  'categories/getCategoriesData', async () => {
    const {data: categoriesData} = await axiosApi.get<Category[]>('/categories');
    return categoriesData;
  });