import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as videoReducerActions from '../../store/reducers/selectedVideoReducer'
import * as browseReducerActions from '../../store/reducers/browseReducer'

import VideoPlayer from '../videoPlayer/VideoPlayer'
import VideoInfo from './components/videoInfo/VideoInfo'
import VideoDesc from './components/videoDesc/VideoDesc'
import Comments from './components/comments/Comments'
import SuggestionBar from './components/suggestionBar/SuggestionBar'

import Util from './../../services/funcsService'

import "./videoPage.css"


class VideoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleScroll = Util.debounce(this.handleScroll.bind(this),50)
  }
  
  // React lifestyle methods
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll) 
      }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll )
  }

  // Custom methods
  handleScroll() {

    // TODO: separate comment request (debounced) and setBrowse check (not debounced) to improve responsiveness of video switching
    // maybe move setBrowse check to video player component and check for browse based on route?

      let top = this.props.windowDimensions.scrollTop
      let totalHeight = document.documentElement.scrollHeight
      let clientHeight = document.documentElement.clientHeight
      if (top > 15 && this.props.browse.browsing === false) this.props.setBrowse(true)
      else if (top < 15 && this.props.browse.browsing) this.props.setBrowse(false)
      if (
          this.props.videos.selectedVideo.hasOwnProperty('id') && 
          !this.props.videos.commentsLoading && 
          totalHeight - 150 < top + clientHeight 
        ) {
        this.props.getVideoComments(this.props.videos.selectedVideo.id, this.props.videos.selectedVideoNextCommentsToken)
      }
  }

  componentWillReceiveProps(nextProps) {
    let nextTop = nextProps.windowDimensions.scrollTop
    if (nextTop !== this.props.windowDimensions.scrollTop) {
      this.handleScroll(nextTop)
    }
  }

  render() {
    const { selectedVideo, selectedVideoComments, commentsLoading, suggestedVideos, videoChannelProfile, selectedVideoNextCommentsToken } = this.props.videos
    const { browsing } = this.props.browse
    const { getVideoStats, getVideoSuggestions, getChannelStats, getMoreVideoComments } = this.props

    const handleSetVideo = (video) => {
      getVideoStats(video.id.videoId)
      getVideoSuggestions( video.id.videoId )
      getChannelStats( video.snippet.channelId )
    }

    return (
      <div className="video-page-container card-grid">
          <div ref="vidPlaceholder" className="video-player-placeholder"></div>
          <VideoPlayer minify={browsing} video={selectedVideo} />
          <VideoInfo vidInfo={selectedVideo} />
          <VideoDesc vidInfo={selectedVideo} channel={videoChannelProfile} />
          <Comments video={selectedVideo} comments={selectedVideoComments} loading={commentsLoading} getMoreComments={() => getMoreVideoComments(selectedVideo.id, selectedVideoNextCommentsToken)}/>
          <SuggestionBar setVideo={handleSetVideo} suggested={suggestedVideos} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    videos: state.selectedVideoReducer,
    browse: state.browseReducer,
    windowDimensions: state.windowSizeReducer
  }
}

export default connect(mapStateToProps, {...browseReducerActions, ...videoReducerActions})(VideoPage)

