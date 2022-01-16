import { ChangeEventHandler, useState, ChangeEvent } from 'react';

type TFormState = {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
};

type THookReturnValue = {
  isEdited: boolean;
  formData: TFormState;
  handleChangeFormData: (e: ChangeEvent<HTMLInputElement>) => void;
  handleResetFormData: () => void;
};

export const useForm = (formState: TFormState): THookReturnValue => {
  const [formData, setFormData] = useState<TFormState>(formState);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const handleChangeFormData: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setFormData((formData) => ({ ...formData, [name]: value }));
    setIsEdited(true);
  };

  const handleResetFormData = () => {
    setFormData(formState);
    setIsEdited(false);
  };

  return {
    isEdited,
    formData,
    handleChangeFormData,
    handleResetFormData,
  };
};
