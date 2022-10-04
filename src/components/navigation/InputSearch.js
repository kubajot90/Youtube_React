import {useEffect, useState, useRef} from 'react'
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import classes from './InputSearch.module.css';
import { useNavigate } from "react-router-dom";

const InputSearch=(props)=>{
    const [searchTerm, setSearchTerm] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isSearchBtnClick, setIsSearchBtnClick] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef();
    
    const inputValueHandler =(e)=>{
        const term = inputRef.current.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\u0142/g, "l").replace(/\s/g, "%20");
        
        setInputValue(term);
    }
    
    const searchHandler=(e)=>{
        e.preventDefault();
        if(!isSearchBtnClick && window.innerWidth < 640 ){
            setIsSearchBtnClick(true);
            inputRef.current.focus();
        }else{
            setSearchTerm(inputValue);
            setIsSearchBtnClick(false);
            props.showLogo(true)
        }
        
    }
    
    useEffect(()=>{
        isSearchBtnClick && inputRef.current.focus();
        isSearchBtnClick && props.showLogo(false)
    },[isSearchBtnClick])
    
    useEffect(()=>{
        navigate('/');
        props.searchHandler(searchTerm)
    },[searchTerm])

    const clearInput =(e)=>{
        inputRef.current.value = '';
        setInputValue('');
        inputRef.current.focus();
    }

    const showLogoAfterBlur =()=>{
        if(window.innerWidth > 640){
            props.showLogo(true);
            setIsSearchBtnClick(false);
        }
    }

    const iconClear =  <div onClick={clearInput} className={classes.iconClear}>
    <IoCloseOutline className={classes.inputXMark}/></div>;

    const arrowBackButton =  <button onClick={()=>{setIsSearchBtnClick(false); props.showLogo(true)}} className={classes.arrowBack}>
    <HiOutlineArrowLeft className={classes.arrowIcon}/>
</button>


    return(
        <form onSubmit={searchHandler} className={`${classes.inputForm} ${ isSearchBtnClick && classes.inputFormActive}`}>
           {isSearchBtnClick && arrowBackButton}
            <div className={classes.inputBox}>
                <input ref={inputRef} placeholder="Szukaj" onBlur={showLogoAfterBlur}  onChange={inputValueHandler} className={`${classes.inputSearch} ${!isSearchBtnClick && classes.inputSearchResponsive}`}/>
                <div className={`${classes.iconBox} ${!isSearchBtnClick && classes.iconBoxResponsive}`}>
                    <IoSearchOutline className={classes.searchIconFocus}/>
                </div>
                    {inputValue && isSearchBtnClick && iconClear}
                    
                <button type='submit' className={`${classes.buttonSearch} ${!isSearchBtnClick && classes.buttonSearchResponsive}`}>
                    <IoSearchOutline className={classes.searchIcon}/>
                </button>
            </div>
        </form>
    )
}

export default InputSearch;