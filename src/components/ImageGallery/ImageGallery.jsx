import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, webformatURL }) => {
        return <ImageGalleryItem image={webformatURL} id={id} key={id} />;
      })}
    </ul>
  );
};

export default ImageGallery;
