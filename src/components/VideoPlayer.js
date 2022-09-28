import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import RelatedVideoCard from './RelatedVideoCard';
import CommentCard from './CommentCard';

import classes from './VideoPlayer.module.css';

const VideoPlayer =()=>{
    const id = useParams();

    const fetchVideos = ()=>{
        fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I&textFormat=plainText&part=snippet&videoId=${id.id}`)
        .then((response)=>response.json())
        .then((responseData)=>{
           console.log(responseData);
        })
        };
    
        useEffect(()=>{
            fetchVideos()
        }, [])

    return(
        <div className={classes.VideoPlayer}>
            <div className={classes.playerSection}>
                <iframe width="640px" height="360px" src={`https://www.youtube.com/embed/${id.id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <div className={classes.videoDescription}>

                </div>
            </div>
            <div className={classes.relatedVIdeosSection}>
                <RelatedVideoCard/>
            </div>
            <div className={classes.comentsSection}>
                <CommentCard/>
            </div>
        </div>
    
    )
}
export default VideoPlayer;

// https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=5rOiW_xY-kc&type=video&key={YOUR_API_KEY}