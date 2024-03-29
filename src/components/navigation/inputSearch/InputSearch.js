import { useEffect, useState, useRef } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { HiOutlineArrowLeft } from "react-icons/hi";
import classes from "./InputSearch.module.css";
import { useNavigate } from "react-router-dom";

const InputSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isSearchBtnClick, setIsSearchBtnClick] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();

  const inputValueHandler = (e) => {
    const term = inputRef.current.value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\u0142/g, "l")
      .replace(/\s/g, "%20");

    setInputValue(term);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (!isSearchBtnClick && window.innerWidth < 640) {
      setIsSearchBtnClick(true);
      inputRef.current.focus();
    } else {
      setSearchTerm(inputValue);
      setIsSearchBtnClick(false);
      props.showLogo(true);
    }
  };

  useEffect(() => {
    isSearchBtnClick && inputRef.current.focus();
    isSearchBtnClick && props.showLogo(false);
  }, [isSearchBtnClick]);

  useEffect(() => {
    navigate("/");
    props.searchHandler(searchTerm);
  }, [searchTerm]);

  const clearInput = () => {
    inputRef.current.value = "";
    setInputValue("");
    inputRef.current.focus();
  };

  const showLogoAfterBlur = () => {
    if (window.innerWidth > 640) {
      props.showLogo(true);
      setIsSearchBtnClick(false);
    } else if (window.innerWidth < 640) {
      setIsSearchBtnClick(false);
      props.showLogo(true);
    }
  };

  const setScreenSize = () => {
    if (window.innerWidth > 677 && isSearchBtnClick) {
      props.showLogo(true);
    }
    if (window.innerWidth < 677 && isSearchBtnClick) {
      props.showLogo(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", setScreenSize);
    return () => {
      window.removeEventListener("resize", setScreenSize);
    };
  }, []);

  const iconClear = (
    <div onClick={clearInput} className={classes.iconClear}>
      <IoCloseOutline className={classes.inputXMark} />
    </div>
  );

  const arrowBackButton = (
    <button
      onClick={() => {
        setIsSearchBtnClick(false);
        props.showLogo(true);
      }}
      className={classes.arrowBack}
    >
      <HiOutlineArrowLeft className={classes.arrowIcon} />
    </button>
  );

  return (
    <>
      {isSearchBtnClick && arrowBackButton}
      <form
        onSubmit={searchHandler}
        className={`${classes.inputForm} ${
          isSearchBtnClick && classes.inputFormActive
        }`}
      >
        <div className={classes.inputBox}>
          <input
            ref={inputRef}
            placeholder="Szukaj"
            onBlur={showLogoAfterBlur}
            onChange={inputValueHandler}
            className={`${classes.inputSearch} ${
              !isSearchBtnClick && classes.inputSearchResponsive
            }`}
            id="inputSearch"
          />

          <div
            className={`${classes.iconBox} ${
              !isSearchBtnClick && classes.iconBoxResponsive
            }`}
          >
            <IoSearchOutline
              className={classes.searchIconFocus}
              data-testid="iconBox"
            />
          </div>
          {inputValue && isSearchBtnClick && iconClear}

          <button
            aria-label="search"
            type="submit"
            className={`${classes.buttonSearch} ${
              !isSearchBtnClick && classes.buttonSearchResponsive
            }`}
          >
            <IoSearchOutline className={classes.searchIcon} />
          </button>
        </div>
      </form>
    </>
  );
};

export default InputSearch;
