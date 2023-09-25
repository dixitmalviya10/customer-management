import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCustomers: [{ cId: 1, fname: "John", lname: "Doe", address: "India" }],
  dialogType: "",
};

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.allCustomers.push(action.payload);
    },
    editCustomer: (state, action) => {
      const { cId, fname, lname, address } = action.payload;
      state.allCustomers = state.allCustomers.map((customer) =>
        customer.cId === cId ? { ...customer, fname, lname, address } : customer
      );
    },
    deleteCustomer: (state, action) => {
      state.allCustomers = state.allCustomers.filter(
        (val) => val.cId !== action.payload
      );
    },
    setDialogType: (state, action) => {
      state.dialogType = action.payload;
    },
  },
});
export const { addCustomer, editCustomer, deleteCustomer, setDialogType } =
  customerSlice.actions;
export default customerSlice.reducer;
