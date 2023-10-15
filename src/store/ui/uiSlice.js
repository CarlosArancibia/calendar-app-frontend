import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modalIsOpen: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.modalIsOpen = true;
    },
    closeModal: (state, action) => {
      state.modalIsOpen = false;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;
