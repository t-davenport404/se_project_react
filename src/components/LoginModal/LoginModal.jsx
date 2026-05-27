import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultValues = {
  email: "",
  password: "",
};

const LoginModal = ({ isOpen, handleLogin, handleSignUpClick, onClose }) => {
  const { values, handleChange, setValues } = useForm(defaultValues);

  const isFormInvalid = !values.email || !values.password;

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(values);
  }

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      buttonText="Log in"
      secondButtonText="or Sign Up"
      onSecondaryAction={handleSignUpClick}
      onClose={onClose}
      isOpen={isOpen}
      disabled={isFormInvalid}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email *
        <input
          type="email"
          name="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password *
        <input
          type="password"
          name="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          required
          minLength="8"
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
