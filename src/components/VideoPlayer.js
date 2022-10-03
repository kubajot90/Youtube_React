import {useEffect, useState, useContext } from 'react';
import {useParams} from 'react-router-dom';
import RelatedVideoCard from './RelatedVideoCard';
import CommentCard from './CommentCard';
import SubscriberCounter from './SubscriberCounter';
import Linkify from 'react-linkify';
import {API_KEY} from '../App';


import classes from './VideoPlayer.module.css';


const VideoPlayer =(props)=>{
    const apiKey= useContext(API_KEY);
    const id = useParams();
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [comments, setComments] = useState([]);
    const [currentVideoDetails, setCurrentVideoDetails] = useState({});
    const [isBtnActive, setIsBtnActive] = useState(false);

    const fetchComments = ()=>{
        fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${id.id}`)
        .then((response)=>response.json())
        .then((responseData)=>{
            setComments(responseData)
        })
        };

        const fetchRelatedVideos = (id)=>{
            window.scrollTo(0, 0, 'auto');
            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&key=${apiKey}&maxResults=8`)
            .then((response)=>response.json())
            .then((responseData)=>{
               setRelatedVideos(responseData.items)
            })
            };
    
        useEffect(()=>{
            fetchRelatedVideos(id.id);
            fetchComments();
        }, [])
    
        

        useEffect(
            function findCurrentVideoId(){
                if(props.videosDetails){
                   const video = props.videosDetails.filter((video)=>{
                   return video.id === id.id
                });
                setCurrentVideoDetails(video[0]) 
                }
              
        },[props.videosDetails]);

        const toggleClass =()=>{
            setIsBtnActive(prev=> !prev)
        }

    return(
        <div className={`${classes.VideoPlayer} `}>
            <div className={classes.playerContainer}>
                <div className={classes.playerSection}>
                    {/* <iframe width="560px" height="315px" src={`https://www.youtube.com/embed/${id.id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                    <div className={classes.frameBox}>
                    <iframe className={classes.frame} src={`https://www.youtube.com/embed/${id.id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className={classes.videoDetailsContainer}>
                        <div className={classes.videoTitle}>
                            {currentVideoDetails.title}
                        </div >
                        <div className={classes.channelInfoBox}>
                            <div className={classes.profileImgBox} >
                                <img className={classes.profileImg} src={`${currentVideoDetails.profileImg}`} alt="profile avatar"></img>
                            </div>
                            <div className={classes.channelDetailsBox}>
                                <div className={classes.channelTitle}>
                                    {currentVideoDetails.channelTitle}
                                </div >
                                <div className={classes.subscriberCount}>
                                    <SubscriberCounter subscriberAmount={currentVideoDetails.subscriberCount}/>
                                </div >
                            </div>
                        </div>
                        <div className={classes.videoDescriptionBox}>
                            <div className={`${classes.videoDescriptionText} ${isBtnActive && classes.videoDescriptionTextActive}`}>
                                <Linkify>
                                    {currentVideoDetails.description}
                                </Linkify>
                            </div>
                        <button onClick={toggleClass} className={`${classes.descriptionButton} ${isBtnActive && classes.buttonActive}`}> POKAŻ WIĘCEJ</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className={`${classes.relatedVideosSection}  `}>
                <RelatedVideoCard relatedVideos={relatedVideos} onFetchRelatedVideos={fetchRelatedVideos} onChangeVideoDetails={props.onChangeVideoDetails}/>
            </div>
            <div className={`${classes.commentsSection} `}>
                <CommentCard comments={comments.items}/>
            </div>
        </div>
    
    )
}
export default VideoPlayer;

// https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=5rOiW_xY-kc&type=video&key={YOUR_API_KEY}