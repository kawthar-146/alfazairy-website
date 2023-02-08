import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CategoriesMenuMUI from "./CategoriesMenuMUI";
import CollectionsMenuMUI from "./CollectionsMenuMUI";

export default function AddDressMUI(props) {
  const [open, setOpen] = React.useState(false);
  const [dressName, setDressName] = React.useState("");
  const [dressPrice, setDressPrice] = React.useState("");
  const [dressCategory, setDressCategory] = React.useState("");
  const [dressCollection, setDressCollection] = React.useState(
    props.collection ? props.collection : ""
  );

  let [dressImage, setDressImage] = React.useState("");
  const [dressDescription, setDressDescription] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (e) => {
    setOpen(false);
  };

  const handleAddDress = async () => {
    if (!dressName.trim()) {
      alert("Please enter a name");
      return;
    }
    if (!dressPrice) {
      alert("Please enter a price");
      return;
    }
    if (!dressCategory) {
      alert("Please choose a category");
      return;
    }
    if (!dressCollection) {
      alert("Please choose a collection");
      return;
    }
    if (!dressImage) {
      alert("Please add an image for the dress");
      return;
    }

    let formData = new FormData();
    formData.append("name", dressName);
    formData.append("price", dressPrice);
    formData.append("category", dressCategory);
    formData.append("Dcollection", dressCollection);
    formData.append("image", dressImage);

    if (dressDescription) {
      formData.append("description", dressDescription);
    }

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
 
      requestOptions.headers = headers;
    }

    try {
      const response = await fetch("/api/dresses", requestOptions);

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        await props.fetchDresses();
        setOpen(false);
        console.log("dress was added");
      } else {
        if (response.status === 400) {
          alert(data.message);
        }
      }
      if (response.status === 401) {
        alert("Not authorized!");
        setOpen(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Dress
      </Button>

      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add a dress</DialogTitle>
        <DialogContent sx={{ overflowY: "hidden" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue=""
            required
            onChange={(e) => {
              setDressName(e.target.value);
            }}
          />
        </DialogContent>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            defaultValue=""
            required
            onChange={(e) => {
              setDressPrice(e.target.value);
            }}
          />
        </DialogContent>
        <DialogContent sx={{ display: "flex", height: "100px" }}>
          <CategoriesMenuMUI setCategory={setDressCategory} />
          <CollectionsMenuMUI
            defaultCollection={props.collection ? props.collection : ""}
            setDressCollection={setDressCollection}
          />
        </DialogContent>

        <DialogContent sx={{ overflowY: "hidden" }}>
          <TextField
            autoFocus
            margin="dense"
            id="picture"
            label="Picture"
            type="file"
            enctype="multipart/form-data"
            fullWidth
            variant="standard"
            required
            onChange={(e) => {
              setDressImage(e.target.files[0]);
            }}
          />
        </DialogContent>
        <DialogContent sx={{ overflowY: "hidden" }}>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            defaultValue=""
            nonChange={(e) => {
              setDressDescription(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDress}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
