import { configureStore } from "@reduxjs/toolkit";
import categorieReducer from "../features/categorie/setActiveCategorie";

export const store = configureStore({
  reducer: {
    categorie: categorieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;