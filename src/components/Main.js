import { Fragment, useState } from "react"
import Navigation from "./navigation/Navigation"
import VideosSection from "./VideosSection"

const Main=()=>{
    const [searchTerm, setSearchTerm] = useState('')

    const searchHandler =(value)=>{
        setSearchTerm(value)
    }

    return(
        <Fragment>
            <Navigation searchHandler={searchHandler}/>
            <VideosSection  searchHandler={searchTerm}/>
        </Fragment>
    )
}

export default Main;