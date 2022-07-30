
import {
  createSelector,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { fetchClient } from "src/axios/axiosApi";
import { RootState } from "src/redux/store/store";
import { CharactersItemState } from "uiTypes";

const initialState: CharactersItemState = {
  item: undefined,
  status: "idle",
};

export const getCharacter = createAsyncThunk(
  "get/characters",
  async (options?: { id:number }) => {
    const { data } = await fetchClient().get(`characters/${options?.id }?`);
    return data;
  }
);



const charactersSlice = createSlice({
  name: "characterItem",
  initialState,
  reducers: {
    clearCharacterItem(state: CharactersItemState) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {

    builder.addCase(getCharacter.pending, (state: CharactersItemState) => {
      state.status = "pending";
    });
    builder.addCase(getCharacter.fulfilled, (state: CharactersItemState, action) => {
      state.item = Object.assign([],action.payload.data.results);
      state.status = "fulfilled";
    });
    builder.addCase(getCharacter.rejected, (state, { error }) => {
      state.status = 'rejected';
      state.error = error.message;
    });

  },
});



export const characterItemSelector = createSelector(
  (state: RootState) => state.characterItem,
  state => state.item
);

export const characterItemLoading = createSelector(
  (state: RootState) => state.characterItem.status,
  status => status !== 'fulfilled'
);

export const characterItemErrorSelector = createSelector(
  (state: RootState) => state.characterItem,
  status => status.error
);

export const { clearCharacterItem } = charactersSlice.actions;

export default charactersSlice.reducer;
