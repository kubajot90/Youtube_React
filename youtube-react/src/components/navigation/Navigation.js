import logoSvg from '../../assets/YouTube_Logo_2017.svg'
import InputSearch from './InputSearch'

import classes from './Navigation.module.css';
import { Fragment } from 'react';

function Navigation() {
  return (
    <nav className={classes.navigation}>
      <img src={logoSvg} alt="Youtube logo"/>
      <InputSearch classname={classes.inputSearch}/>
    </nav>
    


  );
}

export default Navigation;