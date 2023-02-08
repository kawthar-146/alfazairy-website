import React from 'react';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CategoriesMenuMUI(props) {


  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const fetchedData = await response.json();
        setCategories(fetchedData.categories);
      } catch (err) {
        alert('Server Error');
      }
    };
    fetchCategories();
  }, []);



  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 300, height: '25px' }}>
        <InputLabel id='demo-controlled-open-select-label'>Category</InputLabel>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          defaultValue={props.defaultCategory ? props.defaultCategory : null}
          label='Category'
          onChange={(e) => {
            props.setCategory(e.target.value);
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
