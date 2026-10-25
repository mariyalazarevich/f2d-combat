import { configureStore } from "@reduxjs/toolkit";
import categorieReducer from "../features/categorie/setActiveCategorie";
import searchQueryReducer from "../features/searchQuery/setSearchQuery";

export const store = configureStore({
  reducer: {
    categorie: categorieReducer,
    searchQuery: searchQueryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;