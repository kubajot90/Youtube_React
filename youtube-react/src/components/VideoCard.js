import {useEffect, useState} from 'react';
import classes from './VideoCard.module.css';
import Card from 'react-bootstrap/Card';
import DateCounter from './DateCounter'

const VideoCard=(props)=>{
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
       <Card style={{ minWidth: '277px' }} className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-1 m-3 flex-grow-1">
          <Card.Img variant="top" src={props.thumbnailUrl} />
          <Card.Body>
            <div className={classes.cardDescription}>
                <div className={classes.profileImgBox}>
                  <img className={classes.profileImg} src={props.profileImgUrl} alt='Profile photos'></img>
                </div>
                <div className={classes.descriptionBox}>
                    <div className={classes.videoTitleBox}>
                        <span className={classes.videoTitle}>{props.title}</span>
                    </div>
                    <span className={classes.channelTitle}>{props.channelTitle}</span>
                    <div className={classes.subtitlesBox}>
                      {/* {viewsCounter()} */}
                      <p className={classes.viewCount}>{views}</p>
                      <DateCounter date={props.date}/>
                    </div>
                    
                </div>
            </div>

          </Card.Body>
        </Card>
    

    )
}

export default VideoCard;