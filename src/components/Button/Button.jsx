import css from './Button.module.css';

const Button = ({ text, clickHandle, disabled }) => {
  return (
    <button
      type="button"
      onClick={clickHandle}
      className={css.buttonLoadMore}
      disabled={disabled}
    >
      {disabled ? 'No more images' : text}
    </button>
  );
};

export default Button;
