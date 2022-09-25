import classes from './VideoCard.module.css';
import Card from 'react-bootstrap/Card';
import ViewCounter from './ViewCounter'
import DateCounter from './DateCounter'

const VideoCard=(props)=>{

  const description = <div className={`${classes.descriptionWide}`}>{props.description}</div>;
  
    return(    
       <Card style={{ minWidth: '277px', background:'transparent' }} className={`${props.isSearch ? 'col-12 flex-row' : 'col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-1 '} m-3 flex-grow-1 `}>
          <Card.Img variant="top" src={props.thumbnailUrl} className={`${classes.headerImg} ${props.isSearch && classes.headerImgWide}`}/>
          <Card.Body>
            <div className={`${classes.cardDescription} ${props.isSearch && classes.cardDescriptionWide}`}>
                <div className={`${classes.profileImgBox} ${props.isSearch && classes.profileImgBoxWide}`}>
                  <img className={classes.profileImg} src={props.profileImgUrl} alt='Profile photos'></img>
                </div>
                <div className={classes.descriptionBox}>
                    <div className={ `${classes.videoTitleBox} ${props.isSearch && classes.videoTitleBoxWide}`}>
                        <span className={`${classes.videoTitle} ${props.isSearch && classes.videoTitleWide}`}>{props.title}</span>
                    </div>
                    <span className={`${classes.channelTitle} ${props.isSearch && classes.channelTitleWide}`}>{props.channelTitle}</span>
                    <div className={`${classes.subtitlesBox} ${props.isSearch && classes.subtitlesBoxWide}`}>
                      <ViewCounter viewCount={props.viewCount}/>
                      <DateCounter date={props.date}/>
                    </div> 
                </div>
                {props.isSearch && description}
                {/* <div className={`${classes.descriptionWide}`}>{props.description}</div> */}
            </div>

          </Card.Body>
        </Card>
    

    )
}

export default VideoCard;