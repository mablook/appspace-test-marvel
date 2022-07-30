
import {
  createSelector,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { fetchClient } from "src/axios/axiosApi";
import { RootState } from "src/redux/store/store";
import { CharactersState } from "uiTypes";

export type Order = {
  order: 'name' | '-name'
}

const initialState: CharactersState = {
  items: undefined,
  status: "idle",
};

export const getCharacters = createAsyncThunk(
  "get/characters",
  async (options?: { offset?: number, limit?: number }) => {
    const { data } = await fetchClient().get(`characters?&offset=${options?.offset || 0}&limit=${options?.limit || 100}`);
    return data;
  }
);

export const getCharactersByName = createAsyncThunk(
  "get/characters-by-name",
  async (options?: { name?:string, offset?: number, limit?: number, order?: any}) => {
    const { data } = await fetchClient().get(`characters?${ options && options.name ? `nameStartsWith=${options.name}` : ''}&offset=${options?.offset || 0}&limit=${options?.limit || 100}${ options && options.order === '-name' && `&orderBy=-name`}`);
    return data;
  }
);

const charactersSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    clearCharactersItems(state: CharactersState) {
      Object.assign(state, initialState);
    },
    setSearchValue(state: CharactersState, action) {
      state.search = action.payload.value
    },
    setOrderValue(state: CharactersState, action) {
      state.order = action.payload.value
    }
  },
  extraReducers: (builder) => {

    builder.addCase(getCharacters.pending, (state: CharactersState) => {
      state.status = "pending";
    });
    builder.addCase(getCharacters.fulfilled, (state: CharactersState, action) => {
      state.items =  state.items && Object.assign(state.items,action.payload.data.results);
      state.status = "fulfilled";
    });
    builder.addCase(getCharacters.rejected, (state, { error }) => {
      state.status = 'rejected';
      state.error = error.message;
    });

    builder.addCase(getCharactersByName.pending, (state: CharactersState) => {
      state.status = "pending";
    });
    builder.addCase(getCharactersByName.fulfilled, (state: CharactersState, action) => {
      state.items = state.items ? Object.assign(state.items,action.payload.data.results) : Object.assign([],action.payload.data.results)
      state.total = action.payload.data.total
      state.status = "fulfilled";
    });
    builder.addCase(getCharactersByName.rejected, (state, { error }) => {
      state.status = 'rejected';
      state.error = error.message;
    });

  },
});

export const searchItemSelector = createSelector(
  (state: RootState) => state.characters,
  state => state.search
);

export const searchResultTotalSelector = createSelector(
  (state: RootState) => state.characters,
  state => state.total
);

export const orderItemSelector = createSelector(
  (state: RootState) => state.characters,
  state => state.order
);

export const charactersSelector = createSelector(
  (state: RootState) => state.characters,
  state => state.items
);

export const characterLoading = createSelector(
  (state: RootState) => state.characters.status,
  status => status !== 'fulfilled'
);

export const characterErrorSelector = createSelector(
  (state: RootState) => state.characters,
  status => status.error
);

export const { clearCharactersItems, setSearchValue, setOrderValue } = charactersSlice.actions;

export default charactersSlice.reducer;
