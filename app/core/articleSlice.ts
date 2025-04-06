// /app/core/articleSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticle } from '../types/news';

interface ArticleState {
  selectedArticle: IArticle | null;
}

const initialState: ArticleState = {
  selectedArticle: null,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setSelectedArticle(state, action: PayloadAction<IArticle>) {
      state.selectedArticle = action.payload;
    },
    clearSelectedArticle(state) {
      state.selectedArticle = null;
    },
  },
});

export const { setSelectedArticle, clearSelectedArticle } = articleSlice.actions;

export default articleSlice.reducer;
