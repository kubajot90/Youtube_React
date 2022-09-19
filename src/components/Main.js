import { Fragment } from "react"
import Navigation from "./navigation/Navigation"
import VideosSection from "./VideosSection"

const Main=()=>{
    return(
        <Fragment>
            <Navigation/>
            <VideosSection/>
        </Fragment>
    )
}

export default Main;