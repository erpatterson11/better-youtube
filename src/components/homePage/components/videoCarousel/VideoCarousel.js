import React, { Component } from 'react'

// MODULES

// COMPONENTS
import VideoLinkCard from '../../../videoLinkCard/VideoLinkCard'
import CarouselButton from './components/carouselButton/CarouselButton'

import FloatingActionButton from 'material-ui/FloatingActionButton'

import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'

// REDUX
import { connect } from 'react-redux'

// OTHER

// CSS
import './videoCarousel.css'


const video = `{"kind":"youtube#searchResult","etag":"'VPWTmrH7dFmi4s1RqrK4tLejnRI/cu5FKMp4GfejPiYj3bEf_2X3kYE'","id":{"kind":"youtube#video","videoId":"2J5GzHoKl1Q"},"snippet":{"publishedAt":"2016-07-15T14:18:42.000Z","channelId":"UC9obdDRxQkmn_4YpcBMTYLw","title":"Dogs, man's best and funniest friends - funny dog compilation","description":"It is never boring with our furry besties! They just don't fail to make our day mor entertaining :D Hope you like our compilation, please share it and SUBSCRIBE!","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/2J5GzHoKl1Q/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/2J5GzHoKl1Q/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/2J5GzHoKl1Q/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Tiger FunnyWorks","liveBroadcastContent":"none"}}`
const parsedVideo = JSON.parse(video)
let videos = [parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo,parsedVideo]


class VideoCarousel extends Component {

    // LIFECYCLE FUNCS
    constructor(props) { 
        super(props) 

        this.state = {
            carouselStyle: {},
            indexLeft: 0,
            transform: 0,
            showScrollRight: "initial",
            showScrollLeft: "none"
        }

        // BIND CUSTOM FUNCS
        this.move = this.move.bind(this)
    }

    componentDidMount() {
        console.log(this.refs.carousel.clientWidth);

    }

    // CUSTOM FUNCS

    move(dir) {
        const videoCardWidth = 214

        let windowCapacity = ~~(this.refs.carousel.clientWidth / videoCardWidth)
        let remainingRight = videos.length - this.state.indexLeft - windowCapacity
        if (dir == "right") {

            // Right
            let stepsLeft = windowCapacity >= remainingRight ? remainingRight : windowCapacity
            let transform = this.state.transform - stepsLeft
            let newIndexLeft = this.state.indexLeft + stepsLeft
            let showScrollRight = newIndexLeft !== videos.length - windowCapacity ? "initial" : "none"
            let carouselStyle = {transform: `translateX(${transform * videoCardWidth}px)`}
            this.setState({
                carouselStyle, 
                indexLeft: newIndexLeft, 
                transform,
                showScrollRight,
                showScrollLeft: "initial"
            })

        } else {

            // Left
            let stepsRight = this.state.indexLeft < windowCapacity ? this.state.indexLeft : windowCapacity
            let transform = this.state.transform + stepsRight
            let newIndexLeft = this.state.indexLeft - stepsRight
            let showScrollLeft = newIndexLeft ? "initial" : "none"

            let carouselStyle = {transform: `translateX(${transform * videoCardWidth}px)`}
            this.setState({
                carouselStyle, 
                indexLeft: newIndexLeft, 
                transform,
                showScrollLeft,
                showScrollRight: "initial"
            })
        }
    } 


    // RENDER
    render() {

        const setVideo = this.props.handleSetVideo

        const renderVideos = function() {
            return videos.map( (vid, i) => <VideoLinkCard vertical key={vid.id.videoId + i} video={vid}  setVideo={setVideo} /> )
        }

        return (
            <div style={{position: "relative"}} >
                <CarouselButton dir="left" move={() => this.move("left")} show={this.state.showScrollLeft} />
                <CarouselButton dir="right" move={() => this.move("right")} show={this.state.showScrollRight}/>
                <div className="video-carousel-container">    
                    <div className="video-carousel-content" ref="carousel" style={this.state.carouselStyle} >
                        {renderVideos()}
                    </div>
                </div>
            </div>
        )
    }
}

// EXPORT

export default VideoCarousel
