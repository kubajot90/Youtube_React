import { useContext } from 'react';
import { PlayerOpenContext } from '../context/PlayerOpenContext';
import classes from './SideBar.module.css';

const SideBar=()=>{
    const isPlayerOpen = useContext(PlayerOpenContext);

    return(
        <div className={`${classes.sideBarBox} ${isPlayerOpen &&classes.hide}`}>
        </div>
    )
}

export default SideBar;