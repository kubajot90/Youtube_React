import {useEffect, useState} from 'react'
import { IoSearchOutline } from 'react-icons/io5';
import classes from './InputSearch.module.css';

const InputSearch=(props)=>{
    const [searchTerm, setSearchTerm] = useState('')

    const searchHandler=(e)=>{
        e.preventDefault();
        setSearchTerm(e.target[0].value);
       ;
    }

    useEffect(()=>{
        props.searchHandler(searchTerm)
    },[searchTerm])

    return(
        <form onSubmit={searchHandler} className={classes.inputBox}>
            <input placeholder="Szukaj" className={classes.inputSearch}/>
            <button type='submit' className={classes.buttonSearch}>
                <IoSearchOutline className={classes.searchIcon}/>
            </button>
        </form>
    )
}

export default InputSearch;