import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import DressesTable from "./DressesTable";

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    overflowY: "hidden",
  },
}));

export default function EditCollectionDresses(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Dresses
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"xl"}
        open={open}
        onClose={handleClose}
        sx={{ overflowY: "hidden" }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            textDecoration: "underline",
            color: "#004d7a",
          }}
        >
          Dresses of {props.collectionName}
        </DialogTitle>
        <DialogContent>
          <DressesTable
            style={{ overflowY: "hidden", borderRadius: "50%" }}
            collection={props.collection}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
