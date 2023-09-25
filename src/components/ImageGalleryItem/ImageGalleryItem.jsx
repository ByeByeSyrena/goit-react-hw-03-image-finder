import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, id }) => {
  return (
    <li className={css.galleryItem} key={id}>
      <img src={image} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
