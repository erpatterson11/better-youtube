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

// css
import './app.css'


class App extends Component {
    constructor() {
        super() 

        this.state = {
          open: false
        }

        this.handleScroll = this.handleScroll.bind(this)
        this.handleSetVideo = this.handleSetVideo.bind(this)
    }

    // React lifestyle methods

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
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
        
        if (this.props.videos.selectedVideo.hasOwnProperty('id') && totalHeight == top + clientHeight) this.props.getVideoComments(this.props.videos.selectedVideo.id, this.props.selectedVideoNextCommentsToken)
    }

    handleSetVideo = (video) => {
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
            <Route exact path="" component={HomePage} />
            <Route path="*" component={HomePage} />
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
