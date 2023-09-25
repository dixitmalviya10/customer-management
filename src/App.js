import "./styles.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CustomerDialog from "./components/CustomerDialog";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  deleteCustomer,
  setDialogType,
} from "./features/customer/customerSlice";
import TextField from "@mui/material/TextField";
import SnackbarComp from "./components/SnackbarComp";
import PaginationComp from "./components/PaginationComp";

export default function App() {
  const [open, setOpen] = useState(false);
  const [openBar, setOpenBar] = useState(false);
  const [prefillData, setPrefillData] = useState({});
  const [search, setSearch] = useState("");
  const [currentOrder, setCurrentOrder] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const { allCustomers } = useSelector((state) => state.customer);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenBar(false);
  };

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(setDialogType("ADD"));
    setOpen(true);
  };
  const handleUpdate = (rowData) => {
    dispatch(setDialogType("EDIT"));
    setPrefillData(rowData);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const props = {
    prefillData: prefillData,
    open: open,
    handleClose: handleClose,
  };

  let itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = allCustomers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allCustomers.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allCustomers.length;
    setItemOffset(newOffset);
  };

  const rows = currentItems
    .filter(
      (val) =>
        val.fname.toLowerCase().includes(search.toLowerCase()) ||
        val.lname.toLowerCase().includes(search.toLowerCase()) ||
        val.address.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0)
    .sort((num1, num2) =>
      currentOrder ? num1.cId - num2.cId : num2.cId - num1.cId
    );

  return (
    <div className="App">
      <Typography my={3} variant="h4" component="h2">
        Customer Management Table
      </Typography>
      <Box my={1} display="flex" justifyContent="end" alignItems="center">
        <TextField
          sx={{ mx: 1 }}
          size="small"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Search"
          type="text"
        />
        <Button variant="outlined" onClick={handleClickOpen}>
          ADD Customer
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ cursor: "pointer" }}>
              <TableCell
                sx={{ maxWidth: 20 }}
                onClick={() => setCurrentOrder(!currentOrder)}
              >
                Customer Id
              </TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                hover
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.cId}
                </TableCell>
                <TableCell align="center">{row.fname}</TableCell>
                <TableCell align="center">{row.lname}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => handleUpdate(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => {
                      dispatch(deleteCustomer(row.cId));
                      setOpenBar(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        mt={2}
        display="flex"
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <Typography>
          Total Customers:-
          <span
            style={{
              background: "rgb(72, 169, 254)",
              padding: "0.4rem 0.7rem",
              borderRadius: "0.25rem",
              fontWeight: "500",
              marginLeft: "0.5rem",
            }}
          >
            {allCustomers.length}
          </span>
        </Typography>
        <PaginationComp
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      </Box>
      <CustomerDialog {...props} />
      <SnackbarComp
        openBar={openBar}
        handleCloseSnackBar={handleCloseSnackBar}
        alertMessage="Deleted Successfully"
      />
    </div>
  );
}
