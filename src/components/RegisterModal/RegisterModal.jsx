import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultValues = {
  email: "",
  password: "",
  name: "",
  avatar: "",
};

const RegisterModal = ({
  isOpen,
  handleRegister,
  handleLoginClick,
  onClose,
}) => {
  const { values, handleChange, setValues } = useForm(defaultValues);

  const { email, password, name, avatar } = values;

  const isFormInvalid = !email || !password || !name || !avatar;

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(values);
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="registration"
      buttonText="Next"
      secondButtonText="or Log in"
      onSecondaryAction={handleLoginClick}
      onClose={onClose}
      isOpen={isOpen}
      disabled={isFormInvalid}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email *
        <input
          type="email"
          name="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password *
        <input
          type="password"
          name="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          required
          minLength="8"
          value={values.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name *
        <input
          type="text"
          name="name"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL *
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="register-avatar"
          placeholder="Avatar URL"
          required
          minLength="8"
          maxLength="100"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
