// modules
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// redux actions
import * as videoReducerActions from './store/reducers/selectedVideoReducer'
import { setBrowse } from './store/reducers/browseReducer'

// components
import HomePage from './components/homePage/HomePage'
import VideoPlayer from './components/videoPlayer/VideoPlayer'
import VideoPage from './components/videoPage/VideoPage'
import SideMenu from './components/sideMenu/SideMenu'
import NavBar from './components/navBar/NavBar'

// utils
import Util from './services/funcsService'

// css
import './app.css'


class App extends Component {
  constructor() {
      super() 

      this.state = {
        open: false
      }

      this.handleSetVideo = this.handleSetVideo.bind(this)
  }

  handleSetVideo(video) {
    console.log(video.id.videoId)
    this.props.getVideoStats(video.id.videoId)
    this.props.setBrowse(false)
    this.props.getChannelStats(video.snippet.channelId)
    this.props.getVideoSuggestions( video.id.videoId )
  }

  render() {

    return (
      <div className="App" >
        <SideMenu />
        <Switch>
            <Route path="/watch" component={VideoPage} />
            <Route path="/home" component={HomePage} />
            <Route path="*" component={VideoPage} />
        </Switch>
        <NavBar videoSearch={this.props.getVideosSearch} setBrowse={this.props.setBrowse} searchResults={this.props.videos.searchResults} setVideo={this.handleSetVideo} />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    videos: state.selectedVideoReducer,
    browse: state.browseReducer,
  }
}

export default connect(mapStateToProps, {...videoReducerActions, setBrowse})(App)
