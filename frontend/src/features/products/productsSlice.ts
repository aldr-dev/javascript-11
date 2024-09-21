import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product, ProductInfo, ValidationError} from '../../types';
import {deleteProduct, fetchOneProduct, fetchProducts, filterByCategory, sendProductData} from './productsThunks';

interface ProductsState {
  productsData: Product[];
  productInfo: ProductInfo | null;
  sendLoading: boolean;
  getLoading: boolean;
  getOneLoading: boolean;
  createError: ValidationError | null;
  deleteLoading: boolean;
}

const initialState: ProductsState = {
  productsData: [],
  productInfo: null,
  sendLoading: false,
  getLoading: false,
  getOneLoading: false,
  createError: null,
  deleteLoading: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterDeleteProduct: (state, {payload: id}: PayloadAction<string>) => {
      state.productsData = state.productsData.filter((item) => item._id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendProductData.pending, (state) => {
      state.sendLoading = true;
      state.createError = null;
    });
    builder.addCase(sendProductData.fulfilled, (state) => {
      state.sendLoading = false;
    });
    builder.addCase(sendProductData.rejected, (state, {payload: error}) => {
      state.sendLoading = false;
      state.createError = error || null;
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.getLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, {payload: products}) => {
      state.getLoading = false;
      state.productsData = products;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.getLoading = false;
    });

    builder.addCase(filterByCategory.pending, (state) => {
      state.getLoading = true;
    });
    builder.addCase(filterByCategory.fulfilled, (state, {payload: products}) => {
      state.getLoading = false;
      state.productsData = products;
    });
    builder.addCase(filterByCategory.rejected, (state) => {
      state.getLoading = false;
    });

    builder.addCase(fetchOneProduct.pending, (state) => {
      state.getOneLoading = true;
    });
    builder.addCase(fetchOneProduct.fulfilled, (state, {payload: product}) => {
      state.getOneLoading = false;
      state.productInfo = product;
    });
    builder.addCase(fetchOneProduct.rejected, (state) => {
      state.getOneLoading = false;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
  selectors: {
    selectProductsData: (state) => state.productsData,
    selectProductInfo: (state) => state.productInfo,
    selectSendLoading: (state) => state.sendLoading,
    selectGetLoading: (state) => state.getLoading,
    selectCreateError: (state) => state.createError,
    selectDeleteLoading: (state) => state.deleteLoading,
  },
});

export const productsReducer = productsSlice.reducer;
export const {filterDeleteProduct} = productsSlice.actions;
export const {
  selectProductsData,
  selectProductInfo,
  selectSendLoading,
  selectGetLoading,
  selectCreateError,
  selectDeleteLoading,
} = productsSlice.selectors;