import { useRef, useEffect, useCallback, FC } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import s from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Components
import ModalOverlay from '../modal-overlay/modal-overlay';

type TComponentProps = {
  title?: string;
  isTitled?: boolean;
  titleClasses?: string;
  handleCloseModal: () => void;
};

const Modal: FC<TComponentProps> = ({
  title,
  isTitled,
  titleClasses,
  handleCloseModal,
  children,
}) => {
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalRoot = document.getElementById('react-modals') as Element;

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

  return modalRoot
    ? ReactDOM.createPortal(
        <ModalOverlay ref={modalOverlayRef} onCloseModal={onCloseModal}>
          <div
            className={isTitled ? s.modalContainer : s.modalContainerNoTitle}
          >
            {isTitled ? (
              <h2 className={cn(s.modalTitle, titleClasses)}>
                {title}
                <CloseIcon type="primary" onClick={handleCloseModal} />
              </h2>
            ) : (
              <CloseIcon type="primary" onClick={handleCloseModal} />
            )}
            {children}
          </div>
        </ModalOverlay>,
        modalRoot
      )
    : null;
};

export default Modal;
