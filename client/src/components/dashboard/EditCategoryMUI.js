import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCollectionMUI(props) {
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState(props.data.name ? props.data.name : '');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editCategoryHandler = async () => {
    if (!name.trim()) {
      alert('Please enter a name');
      return;
    }

    const data = { name: name };

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    let token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : null;
    if (token) {
      requestOptions.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(
        `/api/categories/${props.data._id}`,
        requestOptions
      );
      const data = await response.json();
      if (response.status === 200) {
        await props.fetchCategories();
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
      >
        <DialogTitle>Edit category Data</DialogTitle>
        <DialogContent>
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
              setName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={editCategoryHandler}>Edit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
