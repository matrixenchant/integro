import { Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import useGetApi from '../hooks/useGetApi';
import { useModal } from '../hooks/useModal';

const Awards = () => {
  const { openModal } = useModal();
  const [loading, awards] = useGetApi('awards/shop', []);

  return (
    <Container maxWidth={'xl'}>
      <Stack direction="row" spacing={2}>
        <Typography variant="h4">Awards</Typography>
        <Button variant="contained" onClick={() => openModal('award-editor', {})}>
          New
        </Button>
      </Stack>
      <Grid container spacing={3} marginTop={2}>
        {awards.map((x) => (
          <Grid key={x._id} item>
            <Card sx={{ padding: 1 }}>
              <Button fullWidth onClick={() => openModal('award-editor', x)}>
                <img
                  src={x.variants[0].imgs[0]}
                  style={{ width: '100%', height: 100, objectFit: 'cover' }}
                  alt=""
                />
              </Button>
              <Typography>{x.name}</Typography>
              <Stack direction="row" justifyContent={'space-between'}>
                <Typography>{x.cost}</Typography>
                <Typography>x{x.variants.reduce((sum, x) => sum + (x?.quantity || 0), 0)}</Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Awards;
