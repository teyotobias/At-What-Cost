import './CustomModal.css';
const CustomModal = ({ message, onClose, closeMessage }) => {
    if (!message) return null;
  
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <p className="message">{message}</p>
          <button onClick={onClose} className="close">{closeMessage}</button>
        </div>
      </div>
    );
  };
  
  export default CustomModal;