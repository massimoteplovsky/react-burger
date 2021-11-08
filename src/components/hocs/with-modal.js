import { useState, useCallback } from 'react';
import pt from 'prop-types';
import { ModalType } from '../../utils/constants';

// Components
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

const withModal = (WrappedComponent) => {
  const WithModal = (props) => {
    const [state, setState] = useState({
      isModalOpen: false,
      modalData: null,
    });
    const { isModalOpen, modalData } = state;
    const { modalType, ...restProps } = props;

    const handleCloseModal = () => {
      setState({ ...state, isModalOpen: false });
    };

    const handleSetModalData = useCallback((data) => {
      setState({ isModalOpen: true, modalData: data });
    }, []);

    const getComponent = () => {
      switch (modalType) {
        case ModalType.ORDER:
          return <OrderDetails orderData={modalData} />;
        case ModalType.INGREDIENT:
          return <IngredientDetails ingredient={modalData} />;
        default:
          return;
      }
    };

    return (
      <>
        <WrappedComponent
          {...restProps}
          handleSetModalData={handleSetModalData}
        />
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
