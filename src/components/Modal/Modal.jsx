import css from './Modal.module.css';

const Modal = ({ image }) => {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Modal;
