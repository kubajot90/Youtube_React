import {useEffect, useState} from 'react'
import { IoSearchOutline } from 'react-icons/io5';
import classes from './InputSearch.module.css';

const InputSearch=(props)=>{
    const [searchTerm, setSearchTerm] = useState('')

    const searchHandler=(e)=>{
        e.preventDefault();
        const term = e.target[0].value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\u0142/g, "l").replace(/\s/g, "%20");
        setSearchTerm(term);
       
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