import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteCollectionMUI(props) {
  const [open, setOpen] = useState(false);
  const [hasDresses, setHasDresses] = useState(false);
  const [message, setMessage] = useState(null);

  const handleClickOpen = async () => {
    setOpen(false);
    try {
      const response = await fetch(
        `/api/dresses/onedress/bycategory/${props.categoryID}`
      );
      const fetchedData = await response.json();
      if (fetchedData.foundOne == 'true') {
        setHasDresses(true);
        setMessage(
          'This collection has assigned dresses, it cannot be deleted!'
        );
      } else {
        setMessage('Are you sure you want to delete this collection?');
      }
      setOpen(true);
    } catch (err) {
      alert('Server Error');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteCategory = async () => {
    setOpen(false);
    const requestOptions = {
      method: 'DELETE',
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
        `/api/categories/${props.categoryID}`,
        requestOptions
      );
      const data = await response.json();

      if (response.status === 200) {
        await props.fetchCategories();
        return;
      }
      if (response.status === 400) {
        alert(data.message);
        return;
      }
      if (response.status === 401) {
        alert('Unauthorized to delete!');
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'></DialogTitle>
        <DialogContent>
          {message !== '' && (
            <DialogContentText id='alert-dialog-description'>
              {message}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          {hasDresses && <Button onClick={handleClose}>OK</Button>}
          {!hasDresses && (
            <Button onClick={handleDeleteCategory} autoFocus>
              Yes
            </Button>
          )}
          {!hasDresses && (
            <Button onClick={handleClose} autoFocus>
              No
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
