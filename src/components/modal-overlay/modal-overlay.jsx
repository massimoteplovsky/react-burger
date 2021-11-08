import { forwardRef } from 'react';
import pt from 'prop-types';
import s from './modal-overlay.module.css';

const ModalOverlay = forwardRef(({ onCloseModal, children }, ref) => {
  return (
    <div ref={ref} className={s.modalOverlay} onClick={onCloseModal}>
      {children}
    </div>
  );
});

ModalOverlay.propTypes = {
  onCloseModal: pt.func.isRequired,
  children: pt.node.isRequired,
};

export default ModalOverlay;
