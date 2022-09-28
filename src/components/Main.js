import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./navigation/Navigation";
import VideosSection from "./VideosSection";
import VideoPlayer from "./VideoPlayer";

const Main=()=>{
    const [searchTerm, setSearchTerm] = useState('')

    const searchHandler =(value)=>{
        setSearchTerm(value)
    }

    return(
        // <Fragment>
        //     <Navigation searchHandler={searchHandler}/>
        //     <VideosSection searchHandler={searchTerm}/>
        // </Fragment>

        <Fragment>
            <Navigation searchHandler={searchHandler}/>
            
            <Routes>
                <Route path='/' element={<VideosSection searchHandler={searchTerm}/>}/>
                <Route path='/:id' element={<VideoPlayer/>}/>
            </Routes>
        </Fragment>
    )
}

export default Main;