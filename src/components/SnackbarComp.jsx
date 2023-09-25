import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

const SnackbarComp = ({ openBar, handleCloseSnackBar, alertMessage }) => {
  return (
    <Snackbar
      open={openBar}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={2000}
      onClose={handleCloseSnackBar}
      message={alertMessage}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleCloseSnackBar}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default SnackbarComp;
