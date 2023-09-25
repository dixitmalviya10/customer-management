import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { Formik, Form } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { addCustomer, editCustomer } from "../features/customer/customerSlice";

export default function CustomerDialog({ prefillData, open, handleClose }) {
  const { dialogType } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Formik
          initialValues={
            dialogType === "EDIT"
              ? {
                  fname: prefillData.fname || "",
                  lname: prefillData.lname || "",
                  address: prefillData.address || "",
                }
              : {
                  fname: "",
                  lname: "",
                  address: "",
                }
          }
          onSubmit={(values) => {
            let payload = {
              cId: Math.random() * 100,
              fname: values.fname,
              lname: values.lname,
              address: values.address,
            };
            if (dialogType === "EDIT") {
              payload.cId = prefillData.cId;
              dispatch(editCustomer(payload));
            } else {
              dispatch(addCustomer(payload));
            }
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <DialogTitle>ADD CUSTOMER</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      name="fname"
                      value={values.fname}
                      onChange={handleChange}
                      label="First Name"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      name="lname"
                      value={values.lname}
                      onChange={handleChange}
                      label="Last Name"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      minRows={3}
                      maxRows={5}
                      margin="dense"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      label="Address"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleClose();
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
