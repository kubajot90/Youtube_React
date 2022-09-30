import logoSvg from '../../assets/YouTube_Logo_2017.svg'
import InputSearch from './InputSearch'
import { useNavigate } from "react-router-dom";

import classes from './Navigation.module.css';

const Navigation=(props)=> {
  const navigate = useNavigate();

  const searchHandler=(value)=>{
    props.searchHandler(value);
  }

  const BackHomePage =()=> {
    navigate(0)
  }



  return (
    <nav className={classes.navigation}>
        <img onClick={BackHomePage} src={logoSvg} alt="Youtube logo" className={classes.logoImage}/>
      <InputSearch classname={classes.inputSearch} searchHandler={searchHandler}/>
    </nav>
    
    // <img onClick={reloadPage} src={logoSvg} alt="Youtube logo" className={classes.logoImage}/>

  );
}

export default Navigation;