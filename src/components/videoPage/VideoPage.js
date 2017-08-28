import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setSelectedVideo } from '../../store/reducers/selectedVideoReducer'

import VideoInfo from '../../components/videoInfo/VideoInfo'
import Comments from '../../components/comments/Comments'
import SideMenu from '../../components/sideMenu/SideMenu'
import SuggestionBar from '../../components/suggestionBar/SuggestionBar'


import "./videoPage.css"


class VideoPage extends Component {
  render() {
    return (
        <div className='card-grid'>
          <div className='video-player-placeholder'></div>
          <VideoInfo vidInfo={this.props.videos.selectedVideo} />
          <Comments />
          <SuggestionBar loading={this.props.videos.loading} setVideo={this.props.setSelectedVideo}/>
          <SideMenu />
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {videos: state.selectedVideoReducer}
}

export default connect(mapStateToProps, {setSelectedVideo})(VideoPage)
