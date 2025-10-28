import { createSlice } from "@reduxjs/toolkit";
import { USER_ROLE } from "../../enums";

interface IInitialState {
  role: USER_ROLE;
}

const initialState: IInitialState = {
  role: USER_ROLE.USER,
};

const userRoleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    switchRoles: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { switchRoles } = userRoleSlice.actions;

export default userRoleSlice.reducer;
