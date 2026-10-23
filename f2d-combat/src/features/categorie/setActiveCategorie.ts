import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice} from '@reduxjs/toolkit';


type CategorieState = {
  categorie: string;
};

const categorieState: CategorieState = {
  categorie: 'all_categories',
};

export const categorieSlice = createSlice({
  name: 'categorie',
  initialState: categorieState,
  reducers: {
    setCategorie: (state, action: PayloadAction<string>) => {
      state.categorie = action.payload;
    },
  },
});

export const { setCategorie } = categorieSlice.actions;
export default categorieSlice.reducer;
