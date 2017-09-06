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

    const { selectedVideo, selectedVideoComments, commentsLoading, suggestedVideos } = this.props.videos
    const { browsing } = this.props.browse

    const handleSetVideo = (video) => {
      this.props.getVideoStats(video.id.videoId)
      this.props.getVideoSuggestions( video.id.videoId )
    }

    console.log( "video page: ", selectedVideo)

    return (

      <div className="video-page-container">
        <SideMenu />
        <div className='card-grid'>
        {
          // <div className='video-player-placeholder'></div>
        }
          <VideoPlayer minify={this.props.browse.browsing} video={selectedVideo} />

          <VideoInfo vidInfo={selectedVideo} />
          <VideoDesc vidInfo={selectedVideo} />
          <Comments video={selectedVideo} comments={selectedVideoComments} loading={commentsLoading} />
          <SuggestionBar setVideo={handleSetVideo} suggested={suggestedVideos} />
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
