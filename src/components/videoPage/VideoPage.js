import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as videoReducerActions from '../../store/reducers/selectedVideoReducer'
import VideoPlayer from '../videoPlayer/VideoPlayer'
import VideoInfo from './components/videoInfo/VideoInfo'
import VideoDesc from './components/videoDesc/VideoDesc'
import Comments from './components/comments/Comments'
import SuggestionBar from './components/suggestionBar/SuggestionBar'


import "./videoPage.css"


class VideoPage extends Component {

  componentDidMount() {
    const vidPlaceholder = this.refs.vidPlaceholder.getBoundingClientRect()
  }

  render() {
    const { selectedVideo, selectedVideoComments, commentsLoading, suggestedVideos, videoChannelProfile, selectedVideoNextCommentsToken } = this.props.videos
    const { browsing } = this.props.browse

    const handleSetVideo = (video) => {
      this.props.getVideoStats(video.id.videoId)
      this.props.getVideoSuggestions( video.id.videoId )
      this.props.getChannelStats( video.snippet.channelId )
    }

    return (
      <div className="video-page-container card-grid">
          <div ref="vidPlaceholder" className="video-player-placeholder"></div>
          <VideoPlayer minify={this.props.browse.browsing} video={selectedVideo} />
          <VideoInfo vidInfo={selectedVideo} />
          <VideoDesc vidInfo={selectedVideo} channel={videoChannelProfile} />
          <Comments video={selectedVideo} comments={selectedVideoComments} loading={commentsLoading} getMoreComments={() => this.props.getMoreVideoComments(this.props.videos.selectedVideo.id, selectedVideoNextCommentsToken)}/>
          <SuggestionBar setVideo={handleSetVideo} suggested={suggestedVideos} />
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

export default connect(mapStateToProps, videoReducerActions)(VideoPage)
