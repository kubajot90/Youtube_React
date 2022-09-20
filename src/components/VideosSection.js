import {useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import classes from './VideosSection.module.css';

 const VideosSection=()=>{
    const apiKey= 'AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I';
    const [search, setSearch] = useState('programming')

    const [videos, setVideos] = useState([]);
    const [channelIds, setChannelIds] = useState([]);
    const [profilesImgObj, setProfilesImgObj] = useState({});
    const [createCards, setCreateCards] = useState('');
   

    useEffect(()=>{
        const fetchVideos = ()=>{
            fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${apiKey}&videoEmbeddable=true&order=viewCount&q=${search}&type=video&part=snippet&maxResults=4&`).then((response)=>response.json()).then((responseData)=>{
                if(responseData.items.length){
                    setVideos(responseData.items)
                }
            })
           
        }
        fetchVideos()
    }, [])



    useEffect( () => {
        if(videos.length){
            setChannelsIdArr();
            fetchUrl() 
           console.log('videos');
           console.log(videos);
        }
       
     },
     [videos])

    const setChannelsIdArr =()=>{
        videos.forEach((video)=>(
            setChannelIds(oldArray => [...oldArray, video.snippet.channelId]))
        )
    }

    const fetchProfileImgUrl = async (id)=>{ 
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?key=${apiKey}&part=snippet&part=statistics&id=${id}`);
        const responseData = await response.json();
        const url = responseData.items[0].snippet.thumbnails.medium.url;
      
        const views = responseData.items[0].statistics.viewCount;
        const updatedValues = {[id]:{imgUrl: url, videoViews : views}};
    //    console.log('responseData');
    //    console.log(responseData);
          setProfilesImgObj(prevState => {
            return {...prevState, ...updatedValues};
          });
    }

   
    useEffect(()=>{
        if(Object.keys(profilesImgObj).length === videos.length){
            createCardsFunc()
        }
    },[profilesImgObj])

    const fetchUrl=()=>{
        channelIds.forEach((id=>{ 
                fetchProfileImgUrl(id)
            }
        ))
    } 
    
    const createCardsFunc=()=>{
        const createNewCards = videos.map((video)=>{
            const profileObj = profilesImgObj[video.snippet.channelId];
    // console.log('profilesImgObj');
    // console.log(profilesImgObj);
           return <VideoCard thumbnailUrl={video.snippet.thumbnails.high.url} profileImgUrl={profileObj.imgUrl} title={video.snippet.title} channelTitle={video.snippet.channelTitle} key={video.id.videoId} date={video.snippet.publishedAt}  viewCount={profileObj.videoViews} />
        }
        )
        setCreateCards(createNewCards)
    }
   
   
return(
    <div className={`gx-0 p-2 row justify-content-center ${classes.VideosSection}`}>
            { createCards}
    </div>
) 

}

 export default VideosSection;

   // const response = await fetch('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I&id=mhLDEcLewHA&part=snippet');

  // const response = await fetch('https://youtube.googleapis.com/youtube/v3/channels?key=AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I&part=snippet&id=UCgN5HqL1a5osnNzFifIr7QA,UCMK8k_XqVEMGqsytc8MRRUg,UCy1x3Lo-F42zaNfRAvrV-iw');

//   const fetchProfileImgUrl = async (channelId)=>{
//     const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?key=AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I&part=snippet&id=${channelId}`);

  //   API KEY: AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I
//   API KEY: AIzaSyB202u3kgEqYzVr2WEBBMefmRDXXGOGcuw
//   API KEY: AIzaSyDAH74sPDWL8ySNg8jhmH75S8J7n-RbW_8
//   API KEY: AIzaSyCvFlxRBJ_OQgnwq5VJsamHP6sQiAbke2k

// "UCMK8k_XqVEMGqsytc8MRRUg"
// "UCy1x3Lo-F42zaNfRAvrV-iw"
// "UCMK8k_XqVEMGqsytc8MRRUg"
// "UCMK8k_XqVEMGqsytc8MRRUg"
