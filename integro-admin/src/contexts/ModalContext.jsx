import { Drawer } from '@mui/material';
import { createContext, useState } from 'react';
import AwardEditor from '../modals/AwardEditor';

export const ModalContext = createContext({
  openModal: () => {},
  closeModal: () => {},
  data: {},
});

export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState({ type: '', anchor: 'right', data: null });
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = (type, data = {}, anchor = 'right') => {
    setModalData({ data, type, anchor });
    setOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        data: modalData,
      }}>
      {children}
      <Drawer open={open} anchor={modalData.anchor} onClose={closeModal}>
        {modalData.type === 'award-editor' && <AwardEditor data={modalData.data} closeModal={closeModal} />}
      </Drawer>
    </ModalContext.Provider>
  );
};
