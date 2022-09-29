import VideoCard from './VideoCard';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import classes from './RelatedVideoCard.module.css';
import DateCounter from './DateCounter';
import ViewCounter from './ViewCounter';

const RelatedVideoCard =(props)=>{
    const [createCards, setCreateCards] = useState('');
    const navigate = useNavigate();

    const createRelatedCardsFunc =()=>{
       const cards =  props.relatedVideos.map(video => {
        return (
            <div onClick={()=>moveToPlayer(video.id.videoId)} key={video.id.videoId} className={classes.relatedVideoCard}>
                <div className={classes.imageBox} style={{backgroundImage: `url(${video.snippet.thumbnails.medium.url})`}}></div>
                <div className={classes.descriptionBox}>
                    <div className={classes.videoTitle}>
                        {video.snippet.title.slice(0,60)}
                    </div>
                    <div className={classes.chanellTitle}>
                        {video.snippet.channelTitle}
                    </div>
                    <div className={classes.counters}>
                        {/* <ViewCounter viewCount={props.viewCount} /> */}
                        <DateCounter date={video.snippet.publishedAt} />
                    </div>
                </div>
            </div>);
        });
            setCreateCards(cards)
    }

    useEffect(()=>{
        createRelatedCardsFunc();
    },[props.relatedVideos])
     
    const moveToPlayer =(id)=>{
        props.onFetchRelatedVideos(id);
        createRelatedCardsFunc();
        navigate(`/${id}`);
    }

    return(<>{createCards}</>)
}

export default RelatedVideoCard;