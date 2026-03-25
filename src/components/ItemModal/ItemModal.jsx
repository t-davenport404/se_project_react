import "./ItemModal.css";
import closeModalBtn from "../../assets/close_img-modal_icon.svg";

function ItemModal({ isOpen, card, onClose }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeModalBtn}
            alt="Close Button"
            className="modal__close-icon"
          />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
