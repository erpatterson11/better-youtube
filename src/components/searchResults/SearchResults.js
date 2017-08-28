import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import VideoLinkCard from '../videoLinkCard/VideoLinkCard'

import './searchResults.css'

class SearchResults extends Component {

    componentWillMount() {
        document.addEventListener("click", this.handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick, false)
    }

    handleClick(e) {
        // console.log(e.target)
        // if( !e.currentTarget.contains(e.relatedTarget) ) {
        //     console.log("cash me ouside how bow dat?")
        // }
    }


    render() {

// onBlur={ this.props.closeResultsComponent }

        let displayResults = () => {

            let handleVideoSelection = (video) => {
                this.props.setVideo(video)
                this.props.closeResultsComponent()
            } 

            return this.props.results.map( (vid,i) => <VideoLinkCard video={vid} key={i} setVideo={handleVideoSelection} /> )
        }

        return (
            <div className="search-results-container card" hidden={!this.props.resultsDisplayed}  tabIndex="-1">
                {Object.keys(this.props.results).length ? displayResults() : ""}
            </div>
        )

    }


}

export default SearchResults