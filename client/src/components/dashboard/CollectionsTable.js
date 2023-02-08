import React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditCollectionMUI from './EditCollectionMUI';
import DeleteCollectionMUI from './DeleteCollectionMUI';
import EditCollectionDresses from './EditCollectionDresses';
import AddCollectionMUI from './AddCollectionMUI';

export default function CollectionsTable() {
  const [rows, setRows] = useState([]);

  const fetchCollections = async () => {
    try {
      const response = await fetch(`/api/collections`);
      const fetchedData = await response.json();
      setRows(fetchedData.collections);
    } catch (err) {
      alert('Server Error');
    }
  };

  useEffect(() => {
    fetchCollections();
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
            <TableCell
              align='right'
              sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
            >
              Year
            </TableCell>
            <TableCell
              align='right'
              sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
            >
              Cover Dress
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <AddCollectionMUI fetchCollections={fetchCollections} />
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
              <TableCell align='right' sx={{ fontSize: '1.1rem' }}>
                {row.year}
              </TableCell>
              <TableCell align='right'>
                {row.coverDress && (
                  <img
                    style={{ width: '100px' }}
                    src={`/${row.coverDress.image}`}
                  />
                )}
              </TableCell>
              <TableCell>
                <EditCollectionDresses
                  collection={row._id}
                  collectionName={row.name}
                />
              </TableCell>
              <TableCell>
                <EditCollectionMUI
                  data={row}
                  fetchCollections={fetchCollections}
                  cover={row.coverDress ? row.coverDress._id : null}
                  collection={row._id}
                />
              </TableCell>
              <TableCell>
                <DeleteCollectionMUI
                  collectionID={row._id}
                  fetchCollections={fetchCollections}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
