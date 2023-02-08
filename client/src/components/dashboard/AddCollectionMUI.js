import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddCollectionMUI(props) {
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setName("");
    setYear("");
  };

  const handleClose = async (e) => {
    setOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, year: year }),
    };

    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    if (token) {
      requestOptions.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch("/api/collections", requestOptions);
      const data = await response.json();
      if (response.status === 200) {
        await props.fetchCollections();
        setOpen(false);
        return;
      }
      if (response.status === 400) {
        alert(data.message);
        return;
      }
      if (response.status === 401) {
        alert("Unauthorized to add!");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Collection
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add a collection</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue=""
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Year"
            type="number"
            fullWidth
            variant="standard"
            defaultValue=""
            onChange={(e) => {
              setYear(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitHandler}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
