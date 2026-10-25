import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import  { type IProduct }  from '../../interfaces/productInterface';
import { EStatus } from '../../enumeration/statusEnum';


type ProductsState = {
    products: IProduct[];
    status: EStatus;
    error: string | undefined;
};

const initialState: ProductsState = {
    products: [],
    status: EStatus.idle,
    error: undefined,
};

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await axios.get('http://localhost:8000/api/products/products', {
    withCredentials: true,
  });
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.status = EStatus.loading;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = EStatus.successfull;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = EStatus.error;
        state.error = action.error.message;
      })
  },
});

export default productsSlice.reducer;
