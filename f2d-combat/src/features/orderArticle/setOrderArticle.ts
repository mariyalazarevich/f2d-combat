import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type OrderArticleState = {
  article: string;
  requestId: number;
};

const orderArticleState: OrderArticleState = {
  article: '',
  requestId: 0,
};

export const orderArticleSlice = createSlice({
  name: 'orderArticle',
  initialState: orderArticleState,
  reducers: {
    setOrderArticle: (state, action: PayloadAction<string>) => {
      state.article = action.payload;
      state.requestId += 1;
    },
  },
});

export const { setOrderArticle } = orderArticleSlice.actions;
export default orderArticleSlice.reducer;
