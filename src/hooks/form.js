import { useState } from 'react';

export const useForm = (formState) => {
  const initialState = { ...formState, isEdited: false };
  const [formData, setFormData] = useState(initialState);

  const handleChangeFormData = ({ target: { name, value } }) => {
    setFormData((formData) => ({ ...formData, [name]: value, isEdited: true }));
  };

  const handleResetFormData = () => {
    setFormData(initialState);
  };

  return {
    formData,
    handleChangeFormData,
    handleResetFormData,
  };
};
