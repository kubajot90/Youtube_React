import { useState } from "react";
import classes from "./ButtonShowMore.module.css";

const ButtonShowMore = (props) => {
  const [isBtnActive, setIsBtnActive] = useState(false);

  const toggleButton = () => {
    setIsBtnActive((prev) => !prev);
  };

  return (
    <button
      onClick={() => {
        toggleButton();
        props.callFunc();
      }}
      className={`${classes.descriptionButton} 
                ${isBtnActive && props.isBtnActive && classes.buttonActive}`}
    >
      POKAŻ WIĘCEJ
    </button>
  );
};
export default ButtonShowMore;
