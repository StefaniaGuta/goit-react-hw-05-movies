import { createSlice } from '@reduxjs/toolkit';
import { popularActors,
    getActorDetails,
    getActorCredits,
    getActorImages,
    getActorExternalIds,
 } from './actors';

const initialState = {
  actors: [],
  isLoading: false,
  error: null,
};

const actorsSlice = createSlice({
  name: 'actors',
  initialState,
  extraReducers: builder => {
    builder
    .addCase(popularActors.fulfilled, (state, action) => {
      state.actors = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getActorDetails.fulfilled, (state, action) => {
      state.actors = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getActorCredits.fulfilled, (state, action) => {
      state.actors = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getActorImages.fulfilled, (state, action) => {
      state.actors = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getActorExternalIds.fulfilled, (state, action) => {
      state.actors = action.payload;
      state.isLoading = false;
      state.error = null;
    })
  },
});

export const actorsReducer = actorsSlice.reducer;