import { Fragment } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import classes from './InputSearch.module.css';

const InputSearch=()=>{
    return(
        <div className={classes.inputBox}>
            <input placeholder="Szukaj" className={classes.inputSearch}/>
            <button className={classes.buttonSearch}>
                <IoSearchOutline className={classes.searchIcon}/>
            </button>
        </div>
    )
}

export default InputSearch;