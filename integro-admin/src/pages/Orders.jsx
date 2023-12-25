import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import toast from 'react-hot-toast';
import { useApi } from '../hooks/useApi';
import useGetApi from '../hooks/useGetApi';
import { useState } from 'react';

const Orders = () => {
  const [loadingApi, api] = useApi();
  const [loading, orders, mutate] = useGetApi('payments/all', []);
  const [loadingUsers, users] = useGetApi('users', []);

  const changeOrder = (id, user, donate) => {
    api('payments/close', {
      body: {
        donate,
        paymentId: id,
        userId: user,
      },
      success: ({ payment }) => {
        mutate(orders.map((x) => (x._id === id ? { ...x, ...payment } : x)));
      },
      error: () => {
        toast.error('Произошла ошибка');
      },
    });
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'user',
      headerName: 'User Info',
      width: 250,
      valueGetter: (p) => {
        const user = users.find((x) => x._id === p.value);
        if (!user) return '';
        return `${user.name} ${p.row.info?.phone || '--'}`;
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 90,
      valueGetter: (p) => (p.value === -1 ? 'custom' : p.value),
    },
    { field: 'status', headerName: 'Status', width: 100 },
    {
      field: 'info',
      headerName: 'Award Name',
      valueGetter: (p) => (p.value.award ? p.value.award.title : 'Donate'),
      width: 150,
    },
    {
      field: 'confirm',
      headerName: '',
      width: 200,
      renderCell: (p) =>
        {
          const [donate, setDonate] = useState(0);

          if (p.row.price === -1) return <Stack direction='row' alignItems='center'>
            <TextField sx={{ width: 100 }} value={donate} onChange={e => setDonate(e.target.value)} />
            <Button
              disabled={loadingApi}
              onClick={() => changeOrder(p.id, p.row.user, donate)}>
              Confirm
            </Button>
          </Stack>

          return p.row.status === 'pending' ? (
            <Button
              disabled={loadingApi}
              fullWidth
              onClick={() => changeOrder(p.id, p.row.user)}>
              Confirm
            </Button>
          ) : null
        },
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      type: 'datetime',
      width: 250,
      valueGetter: (params) =>
        new Date(params.value).toLocaleDateString('ru', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
  ];

  return (
    <Container maxWidth={'xl'}>
      <Typography variant="h4">Orders</Typography>
      <DataGrid
        getRowId={(row) => row._id}
        sx={{ marginTop: 2, height: 635 }}
        rows={orders}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        loading={loading}
        disableRowSelectionOnClick
      />
    </Container>
  );
};

export default Orders;
