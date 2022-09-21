import logoSvg from '../../assets/YouTube_Logo_2017.svg'
import InputSearch from './InputSearch'

import classes from './Navigation.module.css';

function Navigation(props) {
  const searchHandler=(value)=>{
    props.searchHandler(value);
  }

  return (
    <nav className={classes.navigation}>
      <img src={logoSvg} alt="Youtube logo" className={classes.logoImage}/>
      <InputSearch classname={classes.inputSearch} searchHandler={searchHandler}/>
    </nav>
    


  );
}

export default Navigation;