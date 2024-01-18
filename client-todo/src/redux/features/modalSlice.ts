import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  todoIdFetchForModal: string;
  modalStatus?: boolean;
}

interface ModalStatus {
  modalStatus: boolean;
}

const initialState: ModalState = {
  todoIdFetchForModal: "",
  modalStatus: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<ModalStatus>) => {
      state.modalStatus = action.payload.modalStatus;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
