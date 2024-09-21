import {createSlice} from '@reduxjs/toolkit';
import {Category} from '../../types';
import {getCategoriesData} from './categoriesThunks';

interface CategoriesState {
  categoriesData: Category[];
  getCategoryLoading: boolean;
}

const initialState: CategoriesState = {
  categoriesData: [],
  getCategoryLoading: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriesData.pending, (state) => {
      state.getCategoryLoading = true;
    });
    builder.addCase(getCategoriesData.fulfilled, (state, {payload: categories}) => {
      state.getCategoryLoading = false;
      state.categoriesData = categories;
    });
    builder.addCase(getCategoriesData.rejected, (state) => {
      state.getCategoryLoading = false;
    });
  },
  selectors: {
    selectCategoriesData: (state) => state.categoriesData,
    selectGetCategoryLoading: (state) => state.getCategoryLoading,
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const {selectCategoriesData, selectGetCategoryLoading} = categoriesSlice.selectors;