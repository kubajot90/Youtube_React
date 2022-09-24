import classes from './VideoCard.module.css';
import Card from 'react-bootstrap/Card';
import ViewCounter from './ViewCounter'
import DateCounter from './DateCounter'

const VideoCard=(props)=>{
  
    return(    
       <Card style={{ minWidth: '277px', background:'transparent' }} className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-1 m-3 flex-grow-1">
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
                      <ViewCounter viewCount={props.viewCount}/>
                      <DateCounter date={props.date}/>
                    </div>
                    
                </div>
            </div>

          </Card.Body>
        </Card>
    

    )
}

export default VideoCard;