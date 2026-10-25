import { configureStore } from "@reduxjs/toolkit";
import categorieReducer from "../features/categorie/setActiveCategorie";
import orderArticleReducer from "../features/orderArticle/setOrderArticle";
import searchQueryReducer from "../features/searchQuery/setSearchQuery";

export const store = configureStore({
  reducer: {
    categorie: categorieReducer,
    searchQuery: searchQueryReducer,
    orderArticle: orderArticleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;