import "./ModalWithForm.css";
import closeModalBtn from "../../assets/close_modal_icon.svg";

function ModalWithForm({
  title,
  children,
  buttonText,
  name,
  isOpen,
  handleCloseClick,
}) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          onClick={handleCloseClick}
          className="modal__close"
        >
          <img src={closeModalBtn} alt="close" className="modal__close-icon" />
        </button>
        <form className="modal__form" name={name}>
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
