import { Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import useGetApi from '../hooks/useGetApi';

const columns = [
  { field: '_id', headerName: 'ID', width: 220 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'rank', headerName: 'Rank', width: 130 },
  {
    field: 'balance',
    headerName: 'Balance',
    type: 'number',
    width: 90,
  },
  {
    field: 'donations',
    headerName: 'Donations',
    type: 'number',
    width: 90,
  },
];

const Users = () => {
  const [loading, users] = useGetApi('users', []);

  return (
    <Container maxWidth={'xl'}>
      <Typography variant="h4">Users</Typography>
      <DataGrid
        getRowId={(row) => row._id}
        sx={{ marginTop: 2, height: 635 }}
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        loading={loading}
      />
    </Container>
  );
};

export default Users;
