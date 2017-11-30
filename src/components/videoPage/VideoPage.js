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
  constructor(props) {
    super(props)
    this.state = {}

    this.handleScroll = this.handleScroll.bind(this)
  }
  
  // React lifestyle methods
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    const vidPlaceholder = this.refs.vidPlaceholder.getBoundingClientRect()
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
  }

  // Custom methods
  handleScroll(e) {
      let top = e.srcElement.scrollingElement.scrollTop
      let totalHeight = document.documentElement.scrollHeight
      let clientHeight = document.documentElement.clientHeight

      if (top > 15 && this.props.browse.browsing === false) this.props.setBrowse(true)
      else if (top < 15 && this.props.browse.browsing) this.props.setBrowse(false)
      if (this.props.videos.selectedVideo.hasOwnProperty('id') && totalHeight == top + clientHeight) {
        this.props.getVideoComments(this.props.videos.selectedVideo.id, this.props.videos.selectedVideoNextCommentsToken)
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
    browse: state.browseReducer
  }
}

export default connect(mapStateToProps, videoReducerActions)(VideoPage)
