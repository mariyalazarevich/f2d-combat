import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type OrderProductPayload = {
  productName: string;
  article: string;
};

type OrderArticleState = {
  productName: string;
  article: string;
  requestId: number;
};

const orderArticleState: OrderArticleState = {
  productName: '',
  article: '',
  requestId: 0,
};

export const orderArticleSlice = createSlice({
  name: 'orderArticle',
  initialState: orderArticleState,
  reducers: {
    setOrderArticle: (state, action: PayloadAction<OrderProductPayload>) => {
      state.productName = action.payload.productName;
      state.article = action.payload.article;
      state.requestId += 1;
    },
  },
});

export const { setOrderArticle } = orderArticleSlice.actions;
export default orderArticleSlice.reducer;
