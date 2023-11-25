import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { ModalProvider } from './contexts/ModalContext';
import Router from './router';

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <AppProvider>
          <ModalProvider>
            <Router />
          </ModalProvider>
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
