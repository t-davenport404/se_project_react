import "./ConfirmDeleteModal.css";
import closeModalBtn from "../../assets/close_modal_icon.svg";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={`modal modal_type_confirm ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__confirm_delete">
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeModalBtn} alt="close" className="modal__close-icon" />
        </button>
        <div className="modal__confirm-container">
          <h2 className="modal__confirm-title">
            Are you sure you want to delete this item?
          </h2>

          <p className="modal__confirm-text">This action is irreversible.</p>

          <button
            className="modal__submit-btn modal__submit-btn_type_delete"
            type="button"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>

          <button className="modal__cancel-btn" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
