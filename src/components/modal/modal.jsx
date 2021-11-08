import { useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import pt from 'prop-types';
import s from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Components
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ isTitled, handleCloseModal, children }) => {
  const modalOverlayRef = useRef();

  const onCloseModal = useCallback(
    (e) => {
      const escKeyCode = 27;
      if (e.target === modalOverlayRef.current || e.keyCode === escKeyCode) {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', onCloseModal);

    return () => {
      document.removeEventListener('keydown', onCloseModal);
    };
  }, [onCloseModal]);

  return ReactDOM.createPortal(
    <ModalOverlay ref={modalOverlayRef} onCloseModal={onCloseModal}>
      <div className={isTitled ? s.modalContainer : s.modalContainerNoTitle}>
        {isTitled ? (
          <h2 className={`${s.modalTitle} text text_type_main-large`}>
            Детали ингредиента
            <CloseIcon type="primary" onClick={handleCloseModal} />
          </h2>
        ) : (
          <CloseIcon type="primary" onClick={handleCloseModal} />
        )}
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  isTitled: pt.bool.isRequired,
  handleCloseModal: pt.func.isRequired,
  children: pt.node.isRequired,
};

export default Modal;
