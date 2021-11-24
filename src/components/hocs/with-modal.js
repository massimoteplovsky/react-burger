import { useContext } from 'react';
import { ModalType } from '../../utils/constants';
import { AppContext } from '../../services/app-context';
import { CLOSE_MODAL } from '../../services/modules/app';

// Components
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

const withModal = (WrappedComponent) => {
  const WithModal = (props) => {
    const { modalType, orderNumber, ingredient, dispatch } = useContext(
      AppContext
    );

    const handleCloseModal = () => {
      dispatch({ type: CLOSE_MODAL });
    };

    const getComponent = () => {
      switch (modalType) {
        case ModalType.ORDER:
          return <OrderDetails orderNumber={orderNumber} />;
        case ModalType.INGREDIENT:
          return <IngredientDetails ingredient={ingredient} />;
        default:
          return;
      }
    };

    return (
      <>
        <WrappedComponent {...props} />
        {modalType && (
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

  return WithModal;
};

export default withModal;
