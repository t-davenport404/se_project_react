import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, handleChange } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New Garment"
      name="add-garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input modal__input_type_card_name"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image URL
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="clothing-imageUrl"
          placeholder="Image URL"
          required
          minLength="1"
          maxLength="100"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label-type-radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            className="modal__radio-input"
            onChange={handleChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label-type-radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            className="modal__radio-input"
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label-type-radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            className="modal__radio-input"
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
