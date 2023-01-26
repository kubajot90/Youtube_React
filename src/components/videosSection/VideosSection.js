import {useEffect, useState, useRef, useContext} from "react";
import VideoCard from "./VideoCard";
import LoadingCard from "../loadingCard/LoadingCard";
import {API_KEY} from '../../App';

import classes from './VideosSection.module.css';

 const VideosSection=(props)=>{
    const apiKey= useContext(API_KEY);
    const [search, setSearch] = useState('programming')
    const defaultSearch = 'programming';
    
    const [videos, setVideos] = useState([]);
    const [channelIds, setChannelIds] = useState([]);
    const [profilesImgObj, setProfilesImgObj] = useState([]);
    const [createCards, setCreateCards] = useState('');
    
    const [canFetch, setCanFetch] = useState(false);
    const [isSearch, setIsSearch] = useState(false);

    const [loadingCard, setLoadingCard] = useState('');
    const [loaderBarWidth, setLoaderBarWidth] = useState(0);
    
    const canLoadMore = useRef(true);
    const videosAmount = useRef(12);
    const fetchMoreAfterScroll = useRef(true);
    const topLoaderRef = useRef();

    useEffect(()=>{
        videosAmount.current = 12;
        props.searchHandler && setSearch(props.searchHandler);
    },[props.searchHandler])
    
    useEffect(()=>{
         if(search !== defaultSearch){
            props.searchHandler && setCanFetch(true);
            props.searchHandler && setIsSearch(true);
         }
    },[search])

   
    const fetchVideos = ()=>{
        isSearch && setLoaderBarWidth(30);
        clearVideosDetails();
        fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${apiKey}&videoEmbeddable=true&order=viewCount&q=${search}&type=video&part=snippet&maxResults=${videosAmount.current}`)
        .then((response)=> response.json())
        .then((responseData)=>{
            if(responseData.items.length){
                setVideos(responseData.items)
            }
            isSearch && setLoaderBarWidth(45);
        }).catch((error) => {
            console.error('Error:', error);
          });
    }

    useEffect(()=>{
        if(props.iskeyValid){
        window.scrollTo(0, 0, 'auto');
            !props.searchHandler && fetchVideos();
            setScreenSize();
        }
    }, [props.iskeyValid])


    useEffect( () => {
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
        isSearch && setLoaderBarWidth(55);
        isSearch && window.scrollTo(0, 0, 'auto');
        let profilesArr =[];
        channelIds.forEach((id)=>{
            fetch(`https://youtube.googleapis.com/youtube/v3/channels?key=${apiKey}&part=snippet&part=statistics&id=${id}`)
        .then((response)=>response.json())
        .then((responseData)=>{
            const obj = {
                    channelId: id, 
                    imgUrl: responseData.items[0].snippet.thumbnails.medium.url,
                    videoViews : responseData.items[0].statistics.viewCount,
                    channelTitle: responseData.items[0].snippet.title,
                    ChannelDescription: responseData.items[0].snippet.description,
                    subscriberCount: responseData.items[0].statistics.subscriberCount,
                    };
                   profilesArr.push(obj);
            })
            .then(()=>{
                setProfilesImgObj([...profilesArr]);
                isSearch && setLoaderBarWidth(prev=> prev + ( 45/videosAmount.current  ))
            }).catch((error) => {
                console.error('Error:', error);
              });
            });
    }
   
    useEffect(()=>{
        if(profilesImgObj.length === videos.length && videos.length === videosAmount.current){
            createCardsFunc()
        }
    },[profilesImgObj]);


    const createCardsFunc=()=>{
        const createNewCards = videos.map((video)=>{
            const profileObj = profilesImgObj.filter((obj)=>{
               return obj.channelId === video.snippet.channelId
            })

            props.onChangeVideoDetails(prev=>[...prev, {
                id: video.id.videoId,
                title: video.snippet.title,
                profileImg: profileObj[0].imgUrl,
                description: video.snippet.description,
                channelId: profileObj[0].channelId,
                channelTitle: profileObj[0].channelTitle,
                ChannelDescription: profileObj[0].ChannelDescription,
                subscriberCount: profileObj[0].subscriberCount,
            }])
           
           return  (
           <VideoCard 
                isSearch={isSearch}
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
           )
          
        }
        )
        setCreateCards(createNewCards)
        canLoadMore.current = true;
    }

    const clearVideosDetails =()=>{
        props.onChangeVideoDetails(prev=>[])
    }
  
    const fetchMoreVideos =()=> {
        videosAmount.current = videosAmount.current + 12; 
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
    
    if(heightPercentage > 99 && canLoadMore.current && fetchMoreAfterScroll.current){
        loadMoreVideos();
        fetchMoreAfterScroll.current = false;
    }

    if(heightPercentage < 85 && !fetchMoreAfterScroll.current){
        fetchMoreAfterScroll.current = true;
    }
}
  
    useEffect(() => {
      window.addEventListener("scroll", setScroll);
      return () => {
        window.removeEventListener("scroll", setScroll);
      };
    }, []);

    const setScreenSize =()=>{
        if(window.innerWidth < 768){ loadingCards(1)} else
        if(window.innerWidth < 992){loadingCards(2)} else
        if(window.innerWidth < 1270){loadingCards(3)} else
        if(window.innerWidth < 1570){loadingCards(4)}
    }
    
    useEffect(() => {
      window.addEventListener("resize", setScreenSize);
      return () => {
        window.removeEventListener("resize", setScreenSize);
      };
    }, []);

    const loadMoreVideos =()=>{
        canLoadMore.current = false;
        fetchMoreVideos();
    }
    
    const loadingCards =(amount)=>{
        let cardsArr=[];
     for(let i = 0; i < amount; i++){
            cardsArr.push(<LoadingCard key={i} />)
        }
        const cards = cardsArr.map((card)=>card);
        setLoadingCard(cards)
    }

    useEffect(()=>{
        loaderBarWidth === 100 && setTimeout(()=>setLoaderBarWidth(0), 1000);
 
         return clearTimeout(()=>setLoaderBarWidth(0), 1000)
     },[loaderBarWidth]);

return(
    <>
        <div 
            ref={topLoaderRef} 
            className={classes.topLoaderBox}
        >
            {loaderBarWidth > 0 && 
                <div 
                    className={classes.topLoader} 
                    style={{width: `${loaderBarWidth}%`}}>
                </div>}
        </div>
        <div 
            className={`gx-0 p-2 row justify-content-center ${classes.VideosSection}`} 
        >
                { createCards }
                {!isSearch && loadingCard}
        </div>
    </>
   
) 
}

 export default VideosSection;
