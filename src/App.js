import React, { Component } from 'react'
import YTSearch from 'youtube-api-search'

import NavBar from './components/navBar/NavBar'
import VideoPlayer from './components/videoPlayer/VideoPlayer'
import VideoInfo from './components/videoInfo/VideoInfo'
import Comments from './components/comments/Comments'
import SideMenu from './components/sideMenu/SideMenu'
import SuggestionBar from './components/suggestionBar/SuggestionBar'



import './app.css'

const apiKey = `AIzaSyAGe9XCQwCwMou1ZmanPOHB-aWo9nZES20`


class App extends Component {

    constructor() {
        super() 

        this.state = {
          browsing: "false",
          vides: [],
          selectedVideo: {}
        }

        this.videoSearch('last week tonight')

        this.handleScroll = this.handleScroll.bind(this)
        this.videoSearch = this.videoSearch.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

  videoSearch(term) {
    YTSearch({key: apiKey, term: term}, (videos) => {
      console.log(videos)
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       })
    })
  }

    handleScroll(e) {
        let top = e.srcElement.scrollingElement.scrollTop
        if (top > 300 && this.state.browsing === false) this.setState({browsing: true})
        else if (top < 300 && this.state.browsing) this.setState({browsing: false})
    }




  render() {
    console.log(this.state.selectedVideo)
    return (
      <div className="App" >
      <VideoPlayer minify={this.state.browsing} video={this.state.selectedVideo} />
        <div className='card-grid'>
          <div className='video-player-placeholder'></div>
          <VideoInfo browse={this.state.browsing} />
          <Comments />
          <SuggestionBar />
          <SideMenu />
        </div>

        <NavBar />
      </div>
    )
  }
}

export default App
