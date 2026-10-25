import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../../data/categories';
import type { IProduct } from '../../interfaces/productInterface';
import { getProducts } from '../getProducts/getProducts';

type CategoryCountsState = {
  counts: Record<string, number>;
};

const categoryIds = categories
  .map(category => category.id)
  .filter(categoryId => categoryId !== 'all_categories');

const initialState: CategoryCountsState = {
  counts: {},
};

export function countProductsByCategory(products: IProduct[]): Record<string, number> {
  const counts: Record<string, number> = {
    all_categories: products.length,
  };

  for (const categoryId of categoryIds) {
    counts[categoryId] = 0;
  }

  for (const product of products) {
    for (const categoryId of new Set(product.category)) {
      if (categoryId in counts && categoryId !== 'all_categories') {
        counts[categoryId] += 1;
      }
    }
  }

  return counts;
}

export const categoryCountsSlice = createSlice({
  name: 'categoryCounts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.counts = countProductsByCategory(action.payload);
    });
  },
});

export default categoryCountsSlice.reducer;
