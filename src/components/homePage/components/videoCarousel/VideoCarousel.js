import React, { Component } from 'react'

// MODULES

// COMPONENTS
import VideoLinkCard from '../../../videoLinkCard/VideoLinkCard'

// REDUX
import { connect } from 'react-redux'

// OTHER

// CSS
import './videoCarousel.css'

class VideoCarousel extends Component {

    // LIFECYCLE FUNCS
    constructor(props) { // define state and biind methods
        super(props) // defines props in constructor, reduces bugs
        this.state = {}
        // BIND CUSTOM FUNCS
        // ( (comp, funcsList) => {
        //     funcsList.forEach( func => comp.func = func.bind(comp) )
        // } )(this, [])
    }

    // componentWillMount() {} // is run before mounting. setState won't trigger re-render. avoid side-effects or subscriptions
    // componentDidMount() {} // is run after mounting. target DOM nodes here. load async data here. 
    // componentWillReceiveProps(nextProps) {} // is run before props changed or parent triggers rerender. use to setState. may run when new props aren't received.
    // shouldComponentUpdate(nextProps, nextState) {} // is run before props or state change triggers rerender. return false to stop component rerender 
    // componentWillUpdate(nextProps, nextState) {} // is run after new props or state are received and comp will rerender. can't call setState
    // componentDidUpdate() {} // is run after initial rerender. operate on DOM. make network requests if state or props changed
    // componentWillUnmount() {} // is run after component unmounts. cancel timers, event listeners, network requests, destroy manually created DOM elements, etc...

    // CUSTOM FUNCS

    // RENDER
    render() {

        const video = `{"kind":"youtube#searchResult","etag":"'VPWTmrH7dFmi4s1RqrK4tLejnRI/cu5FKMp4GfejPiYj3bEf_2X3kYE'","id":{"kind":"youtube#video","videoId":"2J5GzHoKl1Q"},"snippet":{"publishedAt":"2016-07-15T14:18:42.000Z","channelId":"UC9obdDRxQkmn_4YpcBMTYLw","title":"Dogs, man's best and funniest friends - funny dog compilation","description":"It is never boring with our furry besties! They just don't fail to make our day mor entertaining :D Hope you like our compilation, please share it and SUBSCRIBE!","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/2J5GzHoKl1Q/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/2J5GzHoKl1Q/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/2J5GzHoKl1Q/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Tiger FunnyWorks","liveBroadcastContent":"none"}}`

        const parsedVideo = JSON.parse(video)
        const videos = [parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo]

        const renderVideos = function() {
            return videos.map( (vid, i) => <VideoLinkCard key={vid.id.videoId + i} video={vid} vertical /> )
        }

        return (
            <div className="video-carousel-container">
                {renderVideos()}
            </div>
        )
    }
}

// REDUX

// function mapStateToProps(state) {
//     return state
// }

// EXPORT

export default VideoCarousel

// REDUX EXPORT

// export default connect( mapStateToProps, mapActionsToProps )(VideoCarousel)