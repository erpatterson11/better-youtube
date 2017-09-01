import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setSelectedVideo } from '../../store/reducers/selectedVideoReducer'
import VideoPlayer from '../videoPlayer/VideoPlayer'
import VideoInfo from '../videoInfo/VideoInfo'
import VideoDesc from '../videoDesc/VideoDesc'
import Comments from '../comments/Comments'
import SideMenu from '../sideMenu/SideMenu'
import SuggestionBar from '../suggestionBar/SuggestionBar'


import "./videoPage.css"


class VideoPage extends Component {
  render() {

    let handleSetVideo = (video) => {
      this.props.setSelectedVideo(video)
      this.props.getVideoComments(video.id.videoId)
      this.props.getVideoSuggestions( video.id.videoId )
    }

    return (
      <div className="video-page-container">
        <SideMenu />
        <div className='card-grid'>
        {
          // <div className='video-player-placeholder'></div>
        }
          <VideoPlayer minify={this.props.browse.browsing} video={this.props.videos.selectedVideo} />

          <VideoInfo vidInfo={this.props.videos.selectedVideo} />
          <VideoDesc />
          <Comments comments={this.props.videos.selectedVideoComments} />
          <SuggestionBar setVideo={handleSetVideo} suggested={this.props.videos.suggestedVideos} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    videos: state.selectedVideoReducer,
    browse: state.browseReducer
  }
}

export default connect(mapStateToProps, {setSelectedVideo})(VideoPage)
