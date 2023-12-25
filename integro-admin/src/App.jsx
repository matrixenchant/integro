import { Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { Toaster } from 'react-hot-toast';
import { useApp } from './hooks/useApp';
import Users from './pages/Users';
import Orders from './pages/Orders';
import Awards from './pages/Awards';
import { useEffect } from 'react';

const pages = ['users', 'orders', 'awards'];

function App() {
  const { section, changeSection } = useApp();

  return (
    <Box className="app" sx={{ flexGrow: 1 }}>
      <AppBar sx={{ position: 'relative', marginBottom: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" marginRight={5}>
            Integra Admin
          </Typography>
          <Stack direction='row' spacing={2}>
            {pages.map((page) => (
              <Button key={page} onClick={() => changeSection(page)} sx={{ my: 2, color: 'white', display: 'block', textDecoration: section === page ? 'underline' : '' }}>
                {page}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>

      {section === 'users' && <Users />}
      {section === 'orders' && <Orders />}
      {section === 'awards' && <Awards />}
    </Box>
  );
}

export default App;
