import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, id, onClick }) => {
  return (
    <li className={css.galleryItem} key={id} onClick={onClick}>
      <img src={image} alt="" className={css.image} />
    </li>
  );
};

export default ImageGalleryItem;
