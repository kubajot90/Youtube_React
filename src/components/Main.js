import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./navigation/Navigation";
import VideosSection from "./VideosSection";
import VideoPlayer from "./VideoPlayer";



const Main=(props)=>{
    const [searchTerm, setSearchTerm] = useState('');
    const [videosDetails, setVideosDetails] = useState([]);

    const changeVideoDetails =(obj)=>{
        setVideosDetails(obj)
    }
    
    const searchHandler =(value)=>{
        setSearchTerm(value)
    }

    return(
        <Fragment>
            <Navigation searchHandler={searchHandler}/>
            <Routes>
                <Route path='/' element={<VideosSection iskeyValid={props.iskeyValid} key={props.key} searchHandler={searchTerm} onChangeVideoDetails={changeVideoDetails}/>}/>
                <Route path='/:id' element={<VideoPlayer videosDetails={videosDetails} onChangeVideoDetails={changeVideoDetails}/>}/>
            </Routes>
        </Fragment>
    )
}

export default Main;