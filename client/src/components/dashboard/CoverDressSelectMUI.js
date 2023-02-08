import React from 'react';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function CoverDressSelectMUI(props) {
  const [open, setOpen] = React.useState(false);

  const [collectionDresses, setCollectionDresses] = useState([]);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const response = await fetch(
          `/api/dresses/bycollection/${props.collection}`
        );
        const fetchedData = await response.json();
        setCollectionDresses(fetchedData.dresses);
      } catch (err) {
        alert('Server Error');
      }
    };
    fetchDresses();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpen}>
        Select Cover Dress
      </Button>
      <FormControl sx={{ m: 2, minWidth: 150 }}>
        <InputLabel id='demo-controlled-open-select-label'>Dress</InputLabel>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          label='Cover Dress'
          defaultValue={props.cover ? props.cover : null}
          onChange={(e) => {
            props.setCoverDress(e.target.value);
          }}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {collectionDresses.map((dress) => (
            <MenuItem key={dress._id} value={dress._id}>
              <img alt='' src={`/${dress.image}`} style={{ width: '70px' }} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
