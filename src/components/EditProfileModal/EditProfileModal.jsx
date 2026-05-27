import { useForm } from "../../hooks/useForm";
import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, handleUpdateUser, onClose }) => {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleUpdateUser(values);
  }

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Save changes"
    >
      <label htmlFor="edit-name" className="modal__label">
        Name *
        <input
          type="text"
          name="name"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="edit-avatar" className="modal__label">
        Avatar URL *
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="edit-avatar"
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
