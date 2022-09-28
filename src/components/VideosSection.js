import {useEffect, useState, useRef} from "react";
import VideoCard from "./VideoCard";
import LoadingCard from "./LoadingCard";

import classes from './VideosSection.module.css';

 const VideosSection=(props)=>{
    const apiKey= 'AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I';
    const [search, setSearch] = useState('programming')

    const [videos, setVideos] = useState([]);
    const [channelIds, setChannelIds] = useState([]);
    const [profilesImgObj, setProfilesImgObj] = useState([]);
    const [createCards, setCreateCards] = useState('');

    const [canFetch, setCanFetch] = useState(false);
    const [isSearch, setIsSearch] = useState(false);

    const canLoadMore = useRef(true);
    const videosAmount = useRef(4);

   

    useEffect(()=>{
        videosAmount.current = 4;
        props.searchHandler && setSearch(props.searchHandler);
    },[props.searchHandler])
    
    useEffect(()=>{
         props.searchHandler && setCanFetch(true);
         props.searchHandler && setIsSearch(true);
    },[search])

   
    const fetchVideos = ()=>{
    fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${apiKey}&videoEmbeddable=true&order=viewCount&q=${search}&type=video&part=snippet&maxResults=${videosAmount.current}`)
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
        console.log(videos);
        setProfilesImgObj(prev =>[])
        if(videos.length === videosAmount.current ){
            setChannelsIdArr();  
        }
     },
     [videos]);

    const setChannelsIdArr =()=>{
        let idsArr =[];
        videos.forEach((video)=>(
            idsArr.push(video.snippet.channelId)
        ));
        setChannelIds(idsArr)
    }

    useEffect( () => {
        fetchProfileImgUrl();
    },[channelIds]);

    const fetchProfileImgUrl =()=>{ 
        let profilesArr =[];
        channelIds.forEach((id)=>{
            fetch(`https://youtube.googleapis.com/youtube/v3/channels?key=${apiKey}&part=snippet&part=statistics&id=${id}`)
        .then((response)=>response.json())
        .then((responseData)=>{
            const obj = {
                    id: id, 
                    imgUrl: responseData.items[0].snippet.thumbnails.medium.url,
                    videoViews : responseData.items[0].statistics.viewCount,
                    };
                   profilesArr.push(obj);
            })
            .then(()=>setProfilesImgObj([...profilesArr]))
            });
    }
   
    useEffect(()=>{
        if(profilesImgObj.length === videos.length ){
            createCardsFunc()
        }
    },[profilesImgObj]);


    const createCardsFunc=()=>{
        const createNewCards = videos.map((video)=>{
            const profileObj = profilesImgObj.filter((obj)=>{
               return obj.id === video.snippet.channelId
            })
           
           return  <VideoCard isSearch={isSearch}
           thumbnailUrl={video.snippet.thumbnails.high.url} 
           title={video.snippet.title} 
           channelTitle={video.snippet.channelTitle} 
           key={video.id.videoId} 
           id={video.id.videoId} 
           date={video.snippet.publishedAt}  
           profileImgUrl={profileObj[0].imgUrl} 
           viewCount={profileObj[0].videoViews}
           description={video.snippet.description}
           />
          
        }
        )
        setCreateCards(createNewCards)
        canLoadMore.current = true;
    }
  
    const fetchMoreVideos =()=> {
        videosAmount.current = videosAmount.current + 4; 
        setCanFetch(true);
    }

    useEffect(()=>{
        if(canFetch){
            fetchVideos();
            setCanFetch(false)
        }
    },[canFetch]);

    const setScroll = () => {
       const heightPercentage = `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}`
    
    if(heightPercentage > 99 && canLoadMore.current){
        loadMoreVideos()
    }
}
  
    useEffect(() => {
      window.addEventListener("scroll", setScroll);
      return () => {
        window.removeEventListener("scroll", setScroll);
      };
    }, []);

    const loadMoreVideos =()=>{
        canLoadMore.current = false;
        fetchMoreVideos();
    }
    
    const loadingCards=    
    <><LoadingCard/><LoadingCard/><LoadingCard/><LoadingCard/></>;

return(
    <div  className={`gx-0 p-2 row justify-content-center ${classes.VideosSection}`}>
            { createCards}
            {!isSearch && loadingCards}
          
    </div>
) 
}

 export default VideosSection;

    //   API KEY: AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I
    //   API KEY: AIzaSyB202u3kgEqYzVr2WEBBMefmRDXXGOGcuw
    //   API KEY: AIzaSyDAH74sPDWL8ySNg8jhmH75S8J7n-RbW_8
    //   API KEY: AIzaSyCvFlxRBJ_OQgnwq5VJsamHP6sQiAbke2k
    //   API KEY: AIzaSyBNOVRGK5yft4Ch2RWyKOITKHzkT1Y9SgA
