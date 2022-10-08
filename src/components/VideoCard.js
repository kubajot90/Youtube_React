import {useContext} from "react";

import Card from 'react-bootstrap/Card';
import ViewCounter from './ViewCounter';
import DateCounter from './DateCounter';
import { useNavigate } from "react-router-dom";
import { PlayerOpenUpdateContext } from '../context/PlayerOpenContext';

import classes from './VideoCard.module.css';

const VideoCard=(props)=>{
  const navigate = useNavigate();
  const PlayerOpenUpdateFunc = useContext(PlayerOpenUpdateContext);
  
  const moveToPlayer =()=>{
    navigate(`${props.id}`)
}

  const cardBodyWide = 
  <div className={classes.cardBodyWide}>
    <div className={classes.cardTitleWide}>
      {props.title}
    </div>
    <div className={classes.cardCountersBoxWide}>
      <ViewCounter viewCount={props.viewCount}/>
      <DateCounter date={props.date}/>
    </div>
    <div className={classes.channelLogoBoxWide}>
      <div className={classes.profileImgBoxWide}><img className={classes.profileImgWide} src={props.profileImgUrl} alt='Profile photos'></img>
      </div>
      <span className={classes.channelTitleWide}>{props.channelTitle}</span>
    </div>
    <div className={classes.cardDescriptionWide}>{props.description}</div>
  </div>

  const cardBody =
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
        <ViewCounter viewCount={props.viewCount}/>
        <DateCounter date={props.date}/>
      </div> 
  </div>
</div>
  
    return(  
       <Card onClick={()=>{moveToPlayer(); PlayerOpenUpdateFunc(true)}} style={{ minWidth: '277px', maxWidth: '1096px', backgroundColor:'transparent' }} className={`${props.isSearch ? 'col-12 flex-row' : 'col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1 '} m-3 flex-grow-1 `}>

          <div className={`${props.isSearch ? classes.cardImageBoxWide : classes.cardImageBox}`} style={{backgroundImage: `url('${props.thumbnailUrl}')`}}>
          </div>
         
          <Card.Body>
            {props.isSearch ? cardBodyWide : cardBody}
            </Card.Body>
          </Card>
       

    )
}

export default VideoCard;