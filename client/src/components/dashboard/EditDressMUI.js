import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import CollectionsMenuMUI from './CollectionsMenuMUI';
import CategoriesMenuMUI from './CategoriesMenuMUI';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    overflowY: 'hidden',
  },
}));

export default function EditDressMUI(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const [dressName, setDressName] = useState(
    props.data.name ? props.data.name : ''
  );
  const [dressPrice, setDressPrice] = useState(
    props.data.price ? props.data.price : ''
  );
  const [dressCategory, setDressCategory] = useState(
    props.data.category ? props.data.category._id : ''
  );
  const [dressCollection, setDressCollection] = useState(
    props.data.Dcollection ? props.data.Dcollection._id : ''
  );
  const [dressImage, setDressImage] = useState(
    props.data.image ? props.data.image : ''
  );
  const [dressDescription, setDressDescription] = useState(
    props.data.description ? props.data.description : ''
  );

  const handleEditDress = async () => {
    if (!dressName.trim()) {
      alert('Please enter a name');
      return;
    }
    if (!dressPrice) {
      alert('Please enter a price');
      return;
    }
    if (!dressCategory) {
      alert('Please choose a category');
      return;
    }
    if (!dressCollection) {
      alert('Please choose a collection');
      return;
    }
    if (!dressImage) {
      alert('Please an image');
      return;
    }

    let formData = new FormData();
    formData.append('name', dressName);
    formData.append('price', dressPrice);
    formData.append('category', dressCategory);
    formData.append('Dcollection', dressCollection);
    formData.append('image', dressImage);
    if (dressDescription) {
      formData.append('description', dressDescription);
    }
    const requestOptions = {
      method: 'PUT',
      body: formData,
    };

    let token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : null;
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      requestOptions.headers = headers;
    }

    try {
      const response = await fetch(
        `/api/dresses/${props.data._id}`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        console.log('updated');
        await props.fetchDresses();
        setOpen(false);
        return;
      }
      if (response.status === 400) {
        alert(data.message);
        return;
      }
      if (response.status === 401) {
        alert('Not Authorized to edit!');
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        sx={{ overflowY: 'scroll' }}
      >
        <DialogTitle>Edit Dress Data</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Name'
            type='text'
            fullWidth
            variant='standard'
            defaultValue={props.data.name}
            onChange={(e) => {
              setDressName(e.target.value);
            }}
          />
        </DialogContent>

        <DialogContent className={classes.dialogContent}>
          <TextField
            autoFocus
            margin='dense'
            id='price'
            label='Price'
            type='text'
            fullWidth
            variant='standard'
            defaultValue={props.data.price}
            onChange={(e) => setDressPrice(e.target.value)}
          />
        </DialogContent>
        <DialogContent
          className={classes.dialogContent}
          sx={{ display: 'flex', height: '100px' }}
        >
          <CategoriesMenuMUI
            defaultCategory={props.data.category._id}
            setCategory={setDressCategory}
          />
          <CollectionsMenuMUI
            defaultCollection={props.data.Dcollection._id}
            setDressCollection={setDressCollection}
          />
        </DialogContent>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>Picture</DialogContentText>
          <img style={{ width: '100px' }} src={`/${props.data.image}`} />
        </DialogContent>

        <DialogContent
          className={(classes.dialogContent, classes.dialogContent)}
        >
          <TextField
            autoFocus
            margin='dense'
            id='picture'
            label='Picture'
            type='file'
            fullWidth
            variant='standard'
            onChange={(e) => setDressImage(e.target.files[0])}
          />
        </DialogContent>
        <DialogContent sx={{ overflowY: 'hidden' }}>
          <TextField
            autoFocus
            margin='dense'
            id='description'
            label='Description'
            type='text'
            fullWidth
            variant='standard'
            defaultValue={props.data.description ? props.data.description : ''}
            onChange={(e) => setDressDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDress}>Edit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
