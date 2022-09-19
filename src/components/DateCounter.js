import { useState } from 'react';
import classes from './DateCounter.module.css';


const DateCounter=(props)=>{
    const publishedDate = props.date;

    return(
        <p className={classes.dateCounter}>
            {publishedDate}
        </p>
    )
}

export default DateCounter