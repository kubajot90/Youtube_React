import classes from './VideoCard.module.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import image from '../assets/exampleIMG.jpg';
import { Fragment } from 'react';

const VideoCard=(props)=>{
    return(
    // <Fragment>
    //     <div className={classes.card}>
    //         <div className={classes.imgBox}></div>
    //         <div className={classes.descriptionBox}>
    //         <div className={classes.profileImg}></div>
    //         <div className={classes.description}>
    //             <span></span>
    //             <span></span>
    //         </div>
    //         </div>

    //     </div>
    // </Fragment>
  
 
    
        <Card style={{ minWidth: '277px' }} className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-1 m-3 flex-grow-1">
          <Card.Img variant="top" src={props.thumbnailUrl} />
          <Card.Body>
            <div className={classes.cardDescription}>
                <div className={classes.profileImgBox}>
                  <img className={classes.profileImg} src={props.profileImgUrl} alt='Profile photos'></img>
                </div>
                <div className={classes.descriptionBox}>
                    <span className={classes.videoTitle}>{props.title}</span>
                    <span className={classes.chanelTitle}>Some great chanel</span>
                    <span className={classes.date}>3 miesiące temu.</span>
                </div>
            </div>

          </Card.Body>
        </Card>
    

    )
}

export default VideoCard;