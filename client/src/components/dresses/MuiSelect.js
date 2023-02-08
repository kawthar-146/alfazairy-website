import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { useState } from 'react';
import './MuiSelect.css';

const MuiSelect = (props) => {
  const [category, setCategory] = useState('');
  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
    props.setSelectedCategory(event.target.value);
  };

  const categoriesArray = props.categories.map((category) => {
    return (
      <MenuItem key={category._id} value={category._id} className='filter-item'>
        {category.name}
      </MenuItem>
    );
  });

  return (
    <Box minWidth='250px' className='filter-menu'>
      <TextField
        className='filter-item'
        label='Category'
        select
        value={category}
        onChange={categoryChangeHandler}
        fullWidth
        InputProps={{
          style: { fontSize: 16, outline: 'none' },
        }}
        InputLabelProps={{
          style: { color: 'black', fontSize: '1rem', border: 'none' },
        }}
      >
        <MenuItem key={0} value='all' className='filter-item'>
          All categories
        </MenuItem>
        {categoriesArray}
      </TextField>
    </Box>
  );
};

export default MuiSelect;
