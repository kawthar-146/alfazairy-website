import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CoverDressSelectMUI from './CoverDressSelectMUI';

export default function EditCollectionMUI(props) {
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState(props.data.name ? props.data.name : '');
  const [year, setYear] = useState(props.data.year ? props.data.year : '');
  const [coverDress, setCoverDress] = useState(
    props.data.cover ? props.data.cover : ''
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editCollectionHandler = async () => {
    if (!name.trim()) {
      alert('Please enter a name');
      return;
    }

    const data = { name: name };
    if (year) {
      data.year = year;
    }

    if (coverDress) {
      data.coverDress = coverDress;
    }

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
        `/api/collections/${props.data._id}`,
        requestOptions
      );
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
        <DialogTitle>Edit collection Data</DialogTitle>
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
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Year'
            type='number'
            fullWidth
            variant='standard'
            defaultValue={props.data.year}
            onChange={(e) => {
              setYear(e.target.value);
            }}
          />
        </DialogContent>
        <DialogContent>
          {/* <DialogContentText>Cover Dress</DialogContentText> */}
          <CoverDressSelectMUI
            collection={props.collection}
            cover={props.cover}
            setCoverDress={setCoverDress}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={editCollectionHandler}>Edit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
