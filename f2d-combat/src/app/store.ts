import { configureStore } from "@reduxjs/toolkit";
import categorieReducer from "../features/categorie/setActiveCategorie";
import orderArticleReducer from "../features/orderArticle/setOrderArticle";
import searchQueryReducer from "../features/searchQuery/setSearchQuery";
import productsReducer from "../features/getProducts/getProducts";
import categoryCountsReducer from "../features/categoryCounts/setCategoryCounts";

export const store = configureStore({
  reducer: {
    categorie: categorieReducer,
    searchQuery: searchQueryReducer,
    orderArticle: orderArticleReducer,
    products: productsReducer,
    categoryCounts: categoryCountsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;