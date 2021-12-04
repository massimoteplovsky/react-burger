import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pt from 'prop-types';
import { ModalType } from '../../utils/constants';
import { setIngredient } from '../../services/ducks/ingredient';
import { getAppState, closeModal } from '../../services/ducks/app';

// Components
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

const withModal = (WrappedComponent) => {
  const WithModal = (props) => {
    const dispatch = useDispatch();
    const { isModalOpen, modalType } = useSelector(getAppState);

    const handleCloseModal = useCallback(() => {
      dispatch(closeModal());
      if (modalType === ModalType.INGREDIENT) {
        dispatch(setIngredient(null));
      }
    }, [modalType, dispatch]);

    const getComponent = () => {
      switch (modalType) {
        case ModalType.ORDER:
          return <OrderDetails />;
        case ModalType.INGREDIENT:
          return <IngredientDetails />;
        default:
          return;
      }
    };

    return (
      <>
        <WrappedComponent {...props} />
        {isModalOpen && (
          <Modal
            isTitled={modalType === ModalType.INGREDIENT}
            handleCloseModal={handleCloseModal}
          >
            {getComponent()}
          </Modal>
        )}
      </>
    );
  };

  WithModal.propTypes = {
    modalType: pt.string.isRequired,
  };

  return WithModal;
};

export default withModal;
