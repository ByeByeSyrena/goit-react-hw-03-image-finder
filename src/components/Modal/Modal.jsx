import css from './Modal.module.css';

const Modal = ({ children }) => {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

export default Modal;
