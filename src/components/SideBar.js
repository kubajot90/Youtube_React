import { useContext } from 'react';
import { PlayerOpenContext } from '../context/PlayerOpenContext';
import { MdHomeFilled } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoCompassOutline } from 'react-icons/io5';
import { BsFileEarmarkPlay, BsCollectionPlay } from 'react-icons/bs';
import { MdOutlineVideoLibrary } from 'react-icons/md';

import classes from './SideBar.module.css';

const SideBar=()=>{
    const isPlayerOpen = useContext(PlayerOpenContext);

    return(
        <div className={`${classes.sideBarBox} ${isPlayerOpen &&classes.hide}`}>
            <button className={`${classes.sideBarBtn} ${classes.menuBtn}`}>         
                <AiOutlineMenu className={classes.btnIcon}/>
            </button>
            <button className={classes.sideBarBtn}>
                <MdHomeFilled className={classes.btnIcon}/>
                <p className={classes.btnTitle}>Główna</p> 
            </button>
            <button className={classes.sideBarBtn}>
                <IoCompassOutline className={classes.btnIcon}/>
                <p className={classes.btnTitle}>Odkrywaj</p>  
            </button>
            <button className={classes.sideBarBtn}>
                <BsFileEarmarkPlay className={classes.btnIconShorts}/>
                <p className={classes.btnTitle}>Shorts</p>  
            </button>
            <button className={classes.sideBarBtn}>
                <BsCollectionPlay className={classes.btnIconSub}/>
                <p className={classes.btnTitle}>Subskrypcje</p>  
            </button>
            <button className={classes.sideBarBtn}>
                <MdOutlineVideoLibrary className={classes.btnIconLibrary}/>
                <p className={classes.btnTitle}>Biblioteka</p>  
            </button>
        </div>
    )
}

export default SideBar;