// modules
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// redux actions
import * as videoReducerActions from './store/reducers/selectedVideoReducer'
import * as windowSizeActions from './store/reducers/windowSizeReducer'
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
      this.handleResize = Util.debounce(this.handleResize.bind(this),100)
      this.handleScroll = Util.debounce(this.handleScroll.bind(this),100)
      
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize) 
    window.addEventListener('scroll', this.handleScroll) 
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize )
    window.removeEventListener('scroll', this.handleScroll )
  }

  // Custom methods
  handleScroll(e) {
      let top = e.srcElement.scrollingElement.scrollTop
      this.props.handleScroll(top)
  }

  handleResize() {
    this.props.handleResize({ 
      width: document.documentElement.clientWidth, 
      height: document.documentElement.clientHeight 
    })
  }

  handleSetVideo(video) {
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
        <NavBar 
          videoSearch={this.props.getVideosSearch} 
          setBrowse={this.props.setBrowse} 
          searchResults={this.props.videos.searchResults} 
          setVideo={this.handleSetVideo} 
        />
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

export default connect(mapStateToProps, {...videoReducerActions, ...windowSizeActions, setBrowse})(App)
