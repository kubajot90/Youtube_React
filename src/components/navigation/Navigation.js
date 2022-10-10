import { useState, useContext, useEffect } from 'react';
import logoSvg from '../../assets/YouTube_Logo_2017.svg';
import InputSearch from './InputSearch';
// import { useNavigate } from "react-router-dom";
import { PlayerOpenUpdateContext } from '../../context/PlayerOpenContext';

import classes from './Navigation.module.css';

const Navigation=(props)=> {
  const PlayerOpenUpdateFunc = useContext(PlayerOpenUpdateContext);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  // const navigate = useNavigate();

  const searchHandler=(value)=>{
    props.searchHandler(value);
  }

  const BackHomePage =()=> {
    PlayerOpenUpdateFunc(false)
    window.location.reload(false);
  }

  const showLogo =(state)=>{
    setIsLogoVisible(state);
  }

  return (
    <nav className={classes.navigation}>
        {isLogoVisible && <img onClick={BackHomePage} src={logoSvg} alt="Youtube logo" className={classes.logoImage}/>}
      <InputSearch showLogo={showLogo} classname={classes.inputSearch} searchHandler={searchHandler}/>
    </nav>
  );
}

export default Navigation;