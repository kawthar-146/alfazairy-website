import React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddCategoryMUI from './AddCategoryMUI';
import EditCategoryMUI from './EditCategoryMUI';
import DeleteCategoryMUI from './DeleteCategoryMUI';

export default function CategoriesTable() {
  const [rows, setRows] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`/api/categories`);
      const fetchedData = await response.json();
      setRows(fetchedData.categories);
    } catch (err) {
      alert('Server Error');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '15px',
        height: '100%',
        padding: '5px',
        overflowY: 'scroll',
      }}
    >
      <Table sx={{ minWidth: '650px' }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              Name
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <AddCategoryMUI fetchCategories={fetchCategories} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component='th' scope='row' sx={{ fontSize: '1.1rem' }}>
                {row.name}
              </TableCell>

              <TableCell>
                <EditCategoryMUI
                  data={row}
                  fetchCategories={fetchCategories}
                  category={row._id}
                />
              </TableCell>
              <TableCell>
                <DeleteCategoryMUI
                  categoryID={row._id}
                  fetchCategories={fetchCategories}
                />
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
