import classes from './SelectButton.module.css';

const SelectButton = ({ children, selected, onClick }) => {
  

  return (
    <span onClick={onClick} className={classes.btn__select}>
      {children}
    </span>
  );
};

export default SelectButton;