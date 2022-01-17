import { forwardRef, ReactNode, SyntheticEvent } from 'react';
import s from './modal-overlay.module.css';

type TComponentProps = {
  children: ReactNode;
  onCloseModal: (e: SyntheticEvent) => void;
};

const ModalOverlay = forwardRef<HTMLDivElement, TComponentProps>(
  ({ onCloseModal, children }, ref) => {
    return (
      <div ref={ref} className={s.modalOverlay} onClick={onCloseModal}>
        {children}
      </div>
    );
  }
);

export default ModalOverlay;
