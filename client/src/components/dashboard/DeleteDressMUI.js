import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteDressMUI(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteDress = async () => {
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
        `/api/dresses/${props.dressID}`,
        requestOptions
      );
      const data = await response.json();

      if (response.status === 200) {
        setOpen(false);
        await props.fetchDresses();
        return;
      }
      if (response.status === 400) {
        alert(data.message);
      }

      if (response.status === 401) {
        alert('Not Authorized to delete!');
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
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this dress?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDress}>YES</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
