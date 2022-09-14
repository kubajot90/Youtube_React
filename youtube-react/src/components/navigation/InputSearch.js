import { Fragment } from 'react';
import classes from './InputSearch.module.css';

const InputSearch=()=>{
    return(
        <Fragment>
            <input placeholder="Szukaj" className={classes.inputSearch}/>
            <button className={classes.buttonSearch}>
                <span className="material-symbols-outlined">
                 search
                </span>
            </button>
        </Fragment>
    )
}

export default InputSearch;