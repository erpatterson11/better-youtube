// modules
import React, { Component } from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'

// redux actions
import { setSelectedVideo, getVideosSearch } from './store/reducers/selectedVideoReducer'
import { setBrowse } from './store/reducers/browseReducer'


// components
import VideoPlayer from './components/videoPlayer/VideoPlayer'
import VideoPage from './components/videoPage/VideoPage'
import NavBar from './components/navBar/NavBar'


// css
import './app.css'


class App extends Component {
    constructor() {
        super() 

        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll(e) {
        let top = e.srcElement.scrollingElement.scrollTop
        if (top > 300 && this.props.browse.browsing === false) this.props.setBrowse(true)
        else if (top < 300 && this.props.browse.browsing) this.props.setBrowse(false)
    }


  render() {
    return (
      <div className="App" >
      <VideoPlayer minify={this.props.browse.browsing} video={this.props.videos.selectedVideo} />
       
        <Router>
          <Switch>
              <Route exact path="/" component={VideoPage} />
              <Route path="*" component={VideoPage} />
          </Switch>
        </Router>

        <NavBar videoSearch={this.props.getVideosSearch} setBrowse={this.props.setBrowse} searchResults={this.props.videos.searchResults} setVideo={this.props.setSelectedVideo} />
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

export default connect(mapStateToProps, {setSelectedVideo, getVideosSearch, setBrowse})(App)
