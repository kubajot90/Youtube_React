import {useEffect, useState, useRef} from 'react'
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import classes from './InputSearch.module.css';
import { useNavigate } from "react-router-dom";

const InputSearch=(props)=>{
    const [searchTerm, setSearchTerm] = useState('');
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef();
    
    const inputValueHandler =(e)=>{
        const term = inputRef.current.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\u0142/g, "l").replace(/\s/g, "%20");
        
        setInputValue(term);
    }
    
    const searchHandler=(e)=>{
        e.preventDefault();
        setSearchTerm(inputValue)
    }
    
    useEffect(()=>{
        navigate('/');
        props.searchHandler(searchTerm)
    },[searchTerm])

    const clearInput =(e)=>{
        inputRef.current.value = '';
        setInputValue('');
        inputRef.current.focus();
    }

    const iconClear =  <div onClick={clearInput} className={classes.iconClear}>
    <IoCloseOutline className={classes.inputXMark}/></div>;


    return(
        <form onSubmit={searchHandler} className={classes.inputForm}>
            <div className={classes.inputBox}>
                <input ref={inputRef} placeholder="Szukaj" onChange={inputValueHandler} className={classes.inputSearch}/>
                <div className={classes.iconBox}>
                    <IoSearchOutline className={classes.searchIconFocus}/>
                </div>
                    {inputValue && iconClear}
                    
                <button type='submit' className={classes.buttonSearch}>
                    <IoSearchOutline className={classes.searchIcon}/>
                </button>
            </div>
        </form>
    )
}

export default InputSearch;