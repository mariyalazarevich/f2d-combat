import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice} from '@reduxjs/toolkit';


type SearchQueryState = {
  searchQuery: string;
};

const searchQueryState: SearchQueryState = {
  searchQuery: '',
};

export const searchQuerySlice = createSlice({
  name: 'categorie',
  initialState: searchQueryState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
