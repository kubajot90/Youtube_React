import { Fragment, useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import classes from './VideosSection.module.css';

 const VideosSection=()=>{
    const [videoUrl, setVideoUrl] = useState('xxx');
    
    useEffect(()=>{
  

        const fetchVideos = async ()=>{
            // const response = await fetch('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I&id=mhLDEcLewHA&part=snippet');

            // const response = await fetch('https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I&q=pies&type=video&part=snippet');

            const response = await fetch('https://youtube.googleapis.com/youtube/v3/channels?key=AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I&part=snippet&id=UCgN5HqL1a5osnNzFifIr7QA');
            const responseData = await response.json();
            console.log(responseData);
            // setVideoUrl(`${responseData.items[4].id.videoId}`)
        }
        // fetchVideos()
    }, [])

    // return(
    //     <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoUrl}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    // )
return(
    <div className={`gx-0 p-2 row justify-content-center ${classes.VideosSection}`}>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
        
    </div>
) 

}

 export default VideosSection;