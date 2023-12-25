import { Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useApp } from '../hooks/useApp';
import toast from 'react-hot-toast';

const Auth = ({ login }) => {
  const [loading, api] = useApi();
  const [body, setBody] = useState({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    api('auth/login', {
      body,
      success: ({ token }) => {
        login(token);
        toast('Вы успешно вошли');
      },
      error: (e) => {
        console.warn(e);
        alert('Неверные данные');
      },
    });
  };

  return (
    <Stack sx={{ width: '100%', height: '100vh' }} alignItems="center" justifyContent="center">
      <Stack spacing={1} sx={{ width: 400 }}>
        <TextField
          label="Email"
          variant="outlined"
          value={body.login}
          onChange={(e) => setBody({ ...body, email: e.target.value })}
        />
        <TextField
          label="Password"
          variant="outlined"
          type='password'
          value={body.password}
          onChange={(e) => setBody({ ...body, password: e.target.value })}
        />
        <Button onClick={onSubmit} disabled={loading} variant="contained">
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default Auth;
