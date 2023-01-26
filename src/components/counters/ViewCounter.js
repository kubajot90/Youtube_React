import {useState, useEffect} from 'react';
import classes from './ViewCounter.module.css';

const ViewCounter =(props)=>{
    const [views, setViews] = useState('')
  
  const viewsCounter=()=>{
    let viewsCount = parseInt(props.viewCount);
    
    if(viewsCount < 5){
      setViews(`${viewsCount.toString().slice(0, 1)} wyświetlenia`);
    } if(viewsCount < 10){
      setViews(`${viewsCount.toString().slice(0, 1)} wyświetleń`);
    } else if(viewsCount < 100){
      setViews(`${viewsCount.toString().slice(0, 2)} wyświetleń`);
    } else if(viewsCount < 1000){
      setViews(`${viewsCount.toString().slice(0, 3)} wyświetlenia`);
    } else if(viewsCount> 999 && viewsCount< 10000){
      setViews(`${viewsCount.toString().slice(0, 1)} tys. wyświetleń`);
    } else if(viewsCount> 9999 && viewsCount< 1000000){
      setViews(`${viewsCount.toString().slice(0, 2)} tys. wyświetleń`);
    } else if(viewsCount > 1000000 && viewsCount< 10000000){
      setViews(`${viewsCount.toString().slice(0, 1)} mln. wyświetleń`);
    } else if(viewsCount > 9999999 && viewsCount< 100000000){
      setViews(`${viewsCount.toString().slice(0, 2)} mln. wyświetleń`);
    } else if(viewsCount >= 100000000) {
      setViews(`${viewsCount.toString().slice(0, 2)} mln. wyświetleń`);
  };
}

  useEffect(()=>{
    viewsCounter()
  },[])

    return(
      <p className={classes.viewCount}>
          {views}
      </p>
    )
}

export default ViewCounter;
