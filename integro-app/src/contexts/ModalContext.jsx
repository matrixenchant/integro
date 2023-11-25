import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { createContext, useEffect, useMemo, useRef, useState } from 'react';

import { AuthModal } from '../modals';
import { $class } from '../utils';
import AwardsModal from '../modals/AwardsModal';
import AddReviewModal from '../modals/AddReviewModal';

export const ModalContext = createContext({
  openModal: () => {},
  closeModal: () => {},
  data: {},
});

const modals = {
  '': {
    component: () => <div></div>,
  },
  auth: {
    component: AuthModal,
  },
  awards: {
    component: AwardsModal
  },
  addReview: {
    component: AddReviewModal
  }
};

export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState({ type: '' });
  const [open, setOpen] = useState(false);
  const $appWrap = useRef();

  useEffect(() => {
    $appWrap.current = document.querySelector('.app-wrapper');
  }, []);

  const modalRef = useRef(null);
  const [springProps, springApi] = useSpring(() => ({
    y: 500,
    scale: 1,
    radius: 20,
  }));

  const closeModal = () => {
    const { height } = modalRef.current.getBoundingClientRect();
    setOpen(false);
    $appWrap.current.classList.remove('modal--active')
    springApi.start({ y: height + 50 });
  };

  const openModal = (type, params = {}) => {
    setModalData({ ...params, type });
    setOpen(true);
    $appWrap.current.classList.add('modal--active')
    springApi.start({ y: 0 });
  };

  const gestures = useDrag(({ type, down, movement: [mx, my], offset: [ox, oy] }) => {
    if (type === 'pointerdown')
      springApi.start({ scale: 0.9, radius: 30, config: { duration: 100 } });
    else if (type === 'pointerup') springApi.start({ scale: 1, radius: 20 });

    if (my < 0) return;

    if (my > 50 && !down) {
      closeModal();
      return;
    }

    springApi.start({ y: down ? my : 0, immediate: down });
  });

  const ModalContent = useMemo(() => modals[modalData.type].component, [modalData]);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        data: modalData,
      }}>
      {children}
      <div
        className={$class('modal-wrapper', ['active', open])}
        style={{ pointerEvents: open ? 'all' : 'none' }}>
        <animated.div
          className="modal"
          style={{
            y: springProps.y,
            borderRadius: springProps.radius.to((v) => `${v}px ${v}px 0 0`),
          }}
          ref={modalRef}>
          <animated.div
            className="modal-handle"
            {...gestures()}
            style={{ scale: springProps.scale }}>
            <div></div>
          </animated.div>
          {/* {!!modals[active] ? modals[active].component(modalData) : null} */}
          <ModalContent data={modalData} closeModal={closeModal} open={open} />
        </animated.div>

        <div onClick={closeModal} className={$class('modal-shadow', ['active', open])}></div>
      </div>
    </ModalContext.Provider>
  );
};
