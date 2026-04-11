import "./ModalWithForm.css";
import closeModalBtn from "../../assets/close_modal_icon.svg";

function ModalWithForm({
  title,
  children,
  buttonText = "Save",
  name,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" onClick={onClose} className="modal__close">
          <img src={closeModalBtn} alt="close" className="modal__close-icon" />
        </button>
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
