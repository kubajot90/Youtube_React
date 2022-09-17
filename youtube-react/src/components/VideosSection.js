import {useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import classes from './VideosSection.module.css';

 const VideosSection=()=>{
    const apiKey= 'AIzaSyDAH74sPDWL8ySNg8jhmH75S8J7n-RbW_8';

    const [videos, setVideos] = useState([]);
    const [channelIds, setChannelIds] = useState([]);
    const [fetchObj, setFetchObj] = useState({});
   

    useEffect(()=>{
        const fetchVideos = async ()=>{
            const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${apiKey}&videoEmbeddable=true&order=viewCount&q=popular&type=video&part=snippet&maxResults=4`);
            // debugger;
             const responseData= await response.json();
           
            //  .then((data)=>setVideos(data.items)).then(()=>addChannelId()).then(()=>test2());

            console.log('responseData.items');
            console.log(responseData.items);

            // useEffect(() => { setVideos(responseData.items) }, [])

            setVideos(responseData.items);
            
            // console.log(videos);
            // addChannelId();
            // test2();
            console.log('koniec fetchVideos');
        }
        fetchVideos()
    }, [])

    useEffect( () => {
        console.log('videos-------------------');
        console.log(videos);
        addChannelId();
        test2();
     },
     [videos])

    const addChannelId =()=>{
        console.log('dziala addchanelid');
        console.log(videos);
        videos.forEach((video)=>(
            setChannelIds(oldArray => [...oldArray, video.snippet.channelId]))
        )
        // console.log(channelIds);
    }

    const fetchUrl = async (id)=>{ 
        // console.log('dzial fetchUrl');
        // console.log(id);
         const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?key=${apiKey}&part=snippet&id=${id}`);
         const responseData = await response.json();
        //  console.log(responseData);
        const url = responseData.items[0].snippet.thumbnails.medium.url;
        const updatedValues = {[id]: url};
          setFetchObj(prevState => {
            return {...prevState, ...updatedValues};
          });
    }

    useEffect( () => {
        console.log('fechobj-------------------');
        console.log(fetchObj);
     },
     [fetchObj])


    const test2=()=>{
        // console.log("dzialaa test2");
        // console.log(channelIds);
        channelIds.forEach((id=>{ 
                fetchUrl(id)
            }
            ))
    } 
    
    
    const test = videos.map((video)=>{
        const profileUrl = fetchObj[video.snippet.channelId]; 
       return <VideoCard thumbnailUrl={video.snippet.thumbnails.high.url} profileImgUrl={profileUrl} title={video.snippet.title} />
    }
    )

    // const createListProfileImgUrl=()=> {
    //     console.log(list);
      
    // } 
        //  setProfileImgUrlList(oldObj => ({...oldObj, id: {url} }))

    
return(
    <div className={`gx-0 p-2 row justify-content-center ${classes.VideosSection}`}>
            {/* <VideoCard/>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/> */}
        {/* {videosList} */}
            {test}
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
