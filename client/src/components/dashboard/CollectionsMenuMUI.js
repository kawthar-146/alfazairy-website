import React from 'react';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CollectionsMenuMUI(props) {
  // const [collection, setCollection] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/collections');
        const fetchedData = await response.json();
        setCollections(fetchedData.collections);
      } catch (err) {
        alert('Server Error');
      }
    };
    fetchCollections();
  }, []);

  // const handleChange = (event) => {
  //   setCollection(event.target.value);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 300, height: '25px' }}>
        <InputLabel id='demo-controlled-open-select-label'>
          Collection
        </InputLabel>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          defaultValue={
            props.defaultCollection ? props.defaultCollection : null
          }
          label='Collection'
          onChange={(e) => {
            props.setDressCollection(e.target.value);
          }}
        >
          {collections.map((collection) => (
            <MenuItem key={collection._id} value={collection._id}>
              {collection.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
