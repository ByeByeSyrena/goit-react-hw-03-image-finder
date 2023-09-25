import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, id, onImageClick }) => {
  return (
    <li
      className={css.galleryItem}
      key={id}
      onClick={() => onImageClick(image)}
    >
      <img src={image} alt="" className={css.image} />
    </li>
  );
};

export default ImageGalleryItem;
