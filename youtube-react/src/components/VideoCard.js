import classes from './VideoCard.module.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import image from '../assets/exampleIMG.jpg';
import { Fragment } from 'react';

const VideoCard=()=>{
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
  
   
    
        <Card  className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-1 m-2 flex-grow-1">
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
    

    )
}

export default VideoCard;