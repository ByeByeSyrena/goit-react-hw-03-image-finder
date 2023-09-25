import css from './Button.module.css';

const Button = ({ text, clickHandle, allImagesLoaded }) => {
  return (
    <button type="button" onClick={clickHandle} className={css.buttonLoadMore}>
      {allImagesLoaded ? 'No more images' : text}
    </button>
  );
};

export default Button;
