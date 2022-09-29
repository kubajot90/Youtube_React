import {useEffect, useState, } from 'react';
import {useParams} from 'react-router-dom';
import RelatedVideoCard from './RelatedVideoCard';
import CommentCard from './CommentCard';
import VideoCard from './VideoCard';


import classes from './VideoPlayer.module.css';


const VideoPlayer =()=>{
    const id = useParams();
    const [relatedVideos, setRelatedVideos] = useState([])

    const fetchVideos = ()=>{
        fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyDwOhD_EqgdyzGC3E_20GYXVI1Zq0rhIMA&textFormat=plainText&part=snippet&videoId=${id.id}`)
        .then((response)=>response.json())
        .then((responseData)=>{
        //    console.log(responseData);
        })
        };

        const fetchRelatedVideos = (id)=>{
            window.scrollTo(0, 0, 'auto');
            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&key=AIzaSyDGNmsrYlb33hVN_6hEZrjLQaQFo1aZ2Xw&maxResults=8`)
            .then((response)=>response.json())
            .then((responseData)=>{
                console.log(responseData.items)
               setRelatedVideos(responseData.items)
            })
            };
    
        useEffect(()=>{
            // fetchVideos();
            fetchRelatedVideos(id.id);
        }, [])


    return(
        <div className={`${classes.VideoPlayer} d-flex justify-content-lg-center flex-column flex-lg-row align-items-center align-items-lg-start col-12 col-lg-8`}>
            <div className={classes.playerContainer}>
                <div className={classes.playerSection}>
                    <iframe width="560px" height="315px" src={`https://www.youtube.com/embed/${id.id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <div className={classes.videoDescription}>

                    </div>
                </div>
            </div>
            <div className={`${classes.relatedVideosSection} align-self-start col-12 col-lg-4`}>
                <RelatedVideoCard relatedVideos={relatedVideos} onFetchRelatedVideos={fetchRelatedVideos}/>
            </div>
            <div className={`${classes.comentsSection} `}>
                <CommentCard/>
            </div>
        </div>
    
    )
}
export default VideoPlayer;

// https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=5rOiW_xY-kc&type=video&key={YOUR_API_KEY}