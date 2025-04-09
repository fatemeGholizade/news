// /app/core/articleSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "app/types/news";

interface ArticleState {
  selectedArticle: Article | null;
}

const initialState: ArticleState = {
  selectedArticle: null,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setSelectedArticle(state, action: PayloadAction<Article>) {
      state.selectedArticle = action.payload;
    },
    clearSelectedArticle(state) {
      state.selectedArticle = null;
    },
  },
});

export const { setSelectedArticle, clearSelectedArticle } =
  articleSlice.actions;

export default articleSlice.reducer;
