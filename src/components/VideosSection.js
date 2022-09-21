import {useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import classes from './VideosSection.module.css';

 const VideosSection=(props)=>{
    const apiKey= 'AIzaSyCvFlxRBJ_OQgnwq5VJsamHP6sQiAbke2k';
    const [search, setSearch] = useState('programming')

    const [videos, setVideos] = useState([]);
    const [channelIds, setChannelIds] = useState([]);
    const [profilesImgObj, setProfilesImgObj] = useState({});
    const [createCards, setCreateCards] = useState('');

    const [videosAmount, setVideosAmount] = useState(1);
    const [canFetch, setCanFetch] = useState(false);

    
    useEffect(()=>{
        props.searchHandler && setSearch(props.searchHandler);
    },[props.searchHandler])
    
    useEffect(()=>{
        console.log('search');
        console.log(search);
         props.searchHandler && fetchMoreVideos();
    },[search])

   
    const fetchVideos = ()=>{
    fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${apiKey}&videoEmbeddable=true&order=viewCount&q=${search}&type=video&part=snippet&maxResults=${videosAmount}`)
    .then((response)=>response.json())
    .then((responseData)=>{
        if(responseData.items.length){
            setVideos(responseData.items)
        }
    })
   
}

    useEffect(()=>{
        fetchVideos()
    }, [])


    useEffect( () => {
        setProfilesImgObj({})
        if(videos.length === videosAmount ){
            setChannelsIdArr();
        }
     },
     [videos]);

    const setChannelsIdArr =()=>{
        let idsArr =[];
        videos.forEach((video)=>(
            idsArr.push(video.snippet.channelId)
        ));
            // setChannelIds(oldArray => [...oldArray, video.snippet.channelId]))
        setChannelIds(idsArr)
    }

    useEffect( () => {
        fetchUrl();
    },[channelIds]);

    const fetchProfileImgUrl =(id)=>{ 
       fetch(`https://youtube.googleapis.com/youtube/v3/channels?key=${apiKey}&part=snippet&part=statistics&id=${id}`)
       .then((response)=>response.json())
       .then((responseData)=>{
        setProfilesImgObj(prevState => {
            return {...prevState, ...{[id]:{imgUrl: responseData.items[0].snippet.thumbnails.medium.url, videoViews : responseData.items[0].statistics.viewCount}}};
          });
       })
    }
   
    useEffect(()=>{
        if(Object.keys(profilesImgObj).length === videos.length){
            createCardsFunc()
        }
    },[profilesImgObj]);

    const fetchUrl=()=>{
        channelIds.forEach((id=>{ 
                fetchProfileImgUrl(id)
            }
        ))
    } 

    const createCardsFunc=()=>{
        const createNewCards = videos.map((video)=>{

            const profileObj = profilesImgObj[video.snippet.channelId];

           return <VideoCard thumbnailUrl={video.snippet.thumbnails.high.url} 
           title={video.snippet.title} 
           channelTitle={video.snippet.channelTitle} 
           key={video.id.videoId} 
           date={video.snippet.publishedAt}  
           profileImgUrl={profileObj.imgUrl} 
           viewCount={profileObj.videoViews}
           />
        }
        )
        setCreateCards(createNewCards)
    }
   
    const fetchMoreVideos =()=> {
        console.log('fetchmorevideos');
        setVideosAmount((prev)=> prev + 1);
        setCanFetch(true);
    }

    useEffect(()=>{
        if(canFetch){
            console.log('fetch video');
            fetchVideos();
            setCanFetch(false)
        }
    },[canFetch])

return(
    <div onClick={fetchMoreVideos} className={`gx-0 p-2 row justify-content-center ${classes.VideosSection}`}>
            { createCards}
    </div>
) 
}

 export default VideosSection;

    //   API KEY: AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I
    //   API KEY: AIzaSyB202u3kgEqYzVr2WEBBMefmRDXXGOGcuw
    //   API KEY: AIzaSyDAH74sPDWL8ySNg8jhmH75S8J7n-RbW_8
    //   API KEY: AIzaSyCvFlxRBJ_OQgnwq5VJsamHP6sQiAbke2k
    //   API KEY: AIzaSyBNOVRGK5yft4Ch2RWyKOITKHzkT1Y9SgA
