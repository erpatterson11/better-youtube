import React, { Component } from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'


import YTSearch from 'youtube-api-search'

import VideoInfo from '../../components/videoInfo/VideoInfo'
import Comments from '../../components/comments/Comments'
import SideMenu from '../../components/sideMenu/SideMenu'
import SuggestionBar from '../../components/suggestionBar/SuggestionBar'


import "./videoPage.css"

const apiKey = `AIzaSyAGe9XCQwCwMou1ZmanPOHB-aWo9nZES20`


class VideoPage extends Component {

  render() {
    {console.log(this.props.vidInfo)}
    return (
        <div className='card-grid'>
          <div className='video-player-placeholder'></div>
          <VideoInfo vidInfo={this.props.vidInfo} />
          <Comments />
          <SuggestionBar />
          <SideMenu />
        </div>
    )
  }
}

export default VideoPage
