import {useEffect, useState, } from 'react';
import {useParams} from 'react-router-dom';
import RelatedVideoCard from './RelatedVideoCard';
import CommentCard from './CommentCard';
import VideoCard from './VideoCard';


import classes from './VideoPlayer.module.css';
import { propTypes } from 'react-bootstrap/esm/Image';


const VideoPlayer =(props)=>{
    const id = useParams();
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [currentVideoDetails, setCurrentVideoDetails] = useState({});

    const fetchVideos = ()=>{
        fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyDAH74sPDWL8ySNg8jhmH75S8J7n-RbW_8&textFormat=plainText&part=snippet&videoId=${id.id}`)
        .then((response)=>response.json())
        .then((responseData)=>{
        //    console.log(responseData);
        })
        };

        const fetchRelatedVideos = (id)=>{
            window.scrollTo(0, 0, 'auto');
            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&key=AIzaSyDAH74sPDWL8ySNg8jhmH75S8J7n-RbW_8&maxResults=8`)
            .then((response)=>response.json())
            .then((responseData)=>{
                console.log(responseData.items)
               setRelatedVideos(responseData.items)
            })
            };
    
        useEffect(()=>{
            // fetchVideos();
            // console.log(id);
            fetchRelatedVideos(id.id);
        }, [])
    
        

        useEffect(
            function findCurrentVideoId(){
                console.log('props.videosDetails', props.videosDetails);
              const video = props.videosDetails.filter((video)=>{
                   return video.id === id.id
                });
                setCurrentVideoDetails(video[0])
        },[props.videosDetails])

        useEffect(
            ()=>{
                console.log('============================currentVideoDetails', currentVideoDetails);
        },[currentVideoDetails])

    return(
        <div className={`${classes.VideoPlayer} d-flex justify-content-lg-center flex-column flex-lg-row align-items-center align-items-lg-start col-12 col-lg-8`}>
            <div className={classes.playerContainer}>
                <div className={classes.playerSection}>
                    <iframe width="560px" height="315px" src={`https://www.youtube.com/embed/${id.id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <div className={classes.videoDescription}>
                        <div className={classes.videoTitle}>
                        {currentVideoDetails.title}
                        </div>
                        <div className={classes.profileImgBox} >
                            <img className={classes.profileImg} src={`${currentVideoDetails.profileImg}`} alt="profile avatar"></img>
                        </div>

                    </div>
                </div>
            </div>
            <div className={`${classes.relatedVideosSection} align-self-start col-12 col-lg-4`}>
                <RelatedVideoCard relatedVideos={relatedVideos} onFetchRelatedVideos={fetchRelatedVideos} onChangeVideoDetails={props.onChangeVideoDetails}/>
            </div>
            <div className={`${classes.comentsSection} `}>
                <CommentCard/>
            </div>
        </div>
    
    )
}
export default VideoPlayer;

// https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=5rOiW_xY-kc&type=video&key={YOUR_API_KEY}