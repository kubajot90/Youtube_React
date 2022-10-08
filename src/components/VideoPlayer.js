import {useEffect, useState, useContext, useRef } from 'react';
import {useParams} from 'react-router-dom';
import RelatedVideoCard from './RelatedVideoCard';
import CommentCard from './CommentCard';
import SubscriberCounter from './SubscriberCounter';
import ButtonShowMore from './ButtonShowMore';
import { Oval } from 'react-loader-spinner'
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
    const [showButtonMore, setShowButtonMore] = useState(false);
    const [showFetchMoreLoader, setShowFetchMoreLoader] = useState(false);
    const [loaderBarWidth, setLoaderBarWidth] = useState(0);
    const [showButtonMoreRelated, setShowButtonMoreRelated] = useState(null);

    const descriptionRef = useRef();
    const commentsAmmount = useRef(3);
    const relatedVidAmmount = useRef(10);
    const allowFetchMore = useRef(true);
    const topLoaderRef = useRef();

    const fetchComments = ()=>{
        setShowFetchMoreLoader(true);
        fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${id.id}&maxResults=${commentsAmmount.current}`)
        .then((response)=>response.json())
        .then((responseData)=>{
            setComments(responseData);
            setShowFetchMoreLoader(false);
            setLoaderBarWidth(40)
        }).catch((error) => {
            console.error('Error:', error);
          });
        };

        const fetchRelatedVideos = (id)=>{
            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&key=${apiKey}&maxResults=${relatedVidAmmount.current}`)
            .then((response)=>response.json())
            .then((responseData)=>{
               setRelatedVideos(responseData.items);
               setLoaderBarWidth(100);
            }).catch((error) => {
                console.error('Error:', error);
              });
            };
    
        useEffect(()=>{
            setScreenSize();
            setLoaderBarWidth(30);
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

        useEffect(
         ()=>{
            setIsBtnActive(false);
            descriptionRef.current.clientHeight > 83 && setShowButtonMore(true);
         },[currentVideoDetails]);

        const fetchMoreRelatedVid =()=>{
            relatedVidAmmount.current = relatedVidAmmount.current +3;
            fetchRelatedVideos(id.id);
            }

        const fetchMoreComments =()=>{
            commentsAmmount.current = commentsAmmount.current + 4;
            fetchComments();
            }
                

         const setScroll = () => {
            const heightPercentage = `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}`
         
         if(heightPercentage > 99 && allowFetchMore.current){
            topLoaderRef.current.style.visibility = 'hidden';
            fetchMoreComments();
            fetchMoreRelatedVid();
            allowFetchMore.current = false;
         }
         
         if(heightPercentage < 85 && !allowFetchMore.current){
             allowFetchMore.current = true;
         }
     }
       
         useEffect(() => {
           window.addEventListener("scroll", setScroll);
           return () => {
             window.removeEventListener("scroll", setScroll);
           };
         }, []);

         useEffect(()=>{
            loaderBarWidth === 100 && setTimeout(()=>setLoaderBarWidth(0), 1000);
     
             return clearTimeout(()=>setLoaderBarWidth(0), 1000)
         },[loaderBarWidth]);

         const setLoaderHandler =(num)=>{
            topLoaderRef.current.style.visibility = 'visible';
            setLoaderBarWidth(num)
         }

        const showMoreRelated =()=>{
            topLoaderRef.current.style.visibility = 'hidden';
            fetchMoreComments();
            fetchMoreRelatedVid();
        }

        const setScreenSize =()=>{
            window.innerWidth < 1000 ?
                setShowButtonMoreRelated(true) : setShowButtonMoreRelated(false) ;
        }
        
        useEffect(() => {
          window.addEventListener("resize", setScreenSize);
          return () => {
            window.removeEventListener("resize", setScreenSize);
          };
        }, []);

    return(
        <>
           <div ref={topLoaderRef} className={classes.topLoaderBox}>
           {loaderBarWidth > 0 && <div className={classes.topLoader} style={{width: `${loaderBarWidth}%`}}></div>}
        </div>
        <div className={`${classes.VideoPlayer} `}>
            <div className={classes.playerContainer}>
                <div className={classes.playerSection}>
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
                            <div ref={descriptionRef} className={`${classes.videoDescriptionText} ${isBtnActive && classes.videoDescriptionTextActive}`}>
                                <Linkify>
                                    {currentVideoDetails.description}
                                </Linkify>
                            </div>
                         { showButtonMore && <ButtonShowMore isBtnActive={isBtnActive} callFunc={toggleClass}/>}
                        </div>

                    </div>
                </div>
            </div>
            <div className={classes.relatedVideosSection}>
                <RelatedVideoCard onSetLoader={setLoaderHandler} relatedVideos={relatedVideos} onFetchRelatedVideos={fetchRelatedVideos} onChangeVideoDetails={props.onChangeVideoDetails}/>
                {showFetchMoreLoader && <Oval
                    height={35}
                    width={35}
                    color="rgb(170, 170, 170)"
                    wrapperStyle={{}}
                    wrapperClass={`${classes.oval}`}
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="rgb(232, 232, 232)"
                    strokeWidth={4}
                    strokeWidthSecondary={4}
                    />}
                    {showButtonMoreRelated && <button onClick={showMoreRelated} className={classes.relatedVideoBtn}>POKAŻ WIĘCEJ</button>}
            </div>
            <div className={`${classes.commentsSection} `}>
                <CommentCard comments={comments.items}/>
            </div>
           {showFetchMoreLoader && <Oval
  height={35}
  width={35}
  color="rgb(170, 170, 170)"
  wrapperStyle={{}}
  wrapperClass={`${classes.oval}`}
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="rgb(232, 232, 232)"
  strokeWidth={4}
  strokeWidthSecondary={4}
/>}
        </div>
        </>
    )
}
export default VideoPlayer;

// https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=5rOiW_xY-kc&type=video&key={YOUR_API_KEY}