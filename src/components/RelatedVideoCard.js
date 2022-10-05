import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import classes from './RelatedVideoCard.module.css';
import DateCounter from './DateCounter';
import {API_KEY} from '../App';


const RelatedVideoCard =(props)=>{
    const apiKey= useContext(API_KEY);
    const [createCards, setCreateCards] = useState('');
    const navigate = useNavigate();

    const createRelatedCardsFunc =()=>{
       const cards =  props.relatedVideos.map(video => {
        const videoDetails = {
            id :video.id.videoId,
            channelId : video.snippet.channelId,
            videoTitle: video.snippet.title,
            description: video.snippet.description
        }

        return (
            <div onClick={()=>moveToPlayer(videoDetails)}  key={video.id.videoId} className={classes.relatedVideoCard}>
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
     
    const moveToPlayer =(obj)=>{
        props.onFetchRelatedVideos(obj.id);
        fetchChannelIDetails(obj);
        navigate(`/${obj.id}`);
        window.scrollTo(0, 0, 'auto');
    }

    const fetchChannelIDetails =(obj)=>{
        
                fetch(`https://youtube.googleapis.com/youtube/v3/channels?key=${apiKey}&part=snippet&part=statistics&id=${obj.channelId}`)
            .then((response)=>response.json())
            .then((responseData)=>{
                console.log(' related video responseData' , responseData);
                const imgUrl = responseData.items[0].snippet.thumbnails.medium.url
                        
                props.onChangeVideoDetails(prev=>[...prev, {
                    channelId: obj.channelId,
                    id: obj.id,
                    title: obj.videoTitle,
                    channelTitle: responseData.items[0].snippet.title,
                    profileImg:imgUrl,
                    ChannelDescription: responseData.items[0].snippet.description,
                    description: obj.description,
                    subscriberCount: responseData.items[0].statistics.subscriberCount,
                }])
                      
                })
                
                
       
    }

    return(<>{createCards}</>)
}

export default RelatedVideoCard;