import css from './Modal.module.css';

const Modal = ({ images }) => {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        {/* {images.map(image => (
          <img src={image.largeImageURL} alt={image.tags} />
        ))} */}
      </div>
    </div>
  );
};

export default Modal;
