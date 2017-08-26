// modules
import React, { Component } from 'react'
import axios from 'axios'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'


// components
import VideoPlayer from './components/videoPlayer/VideoPlayer'
import VideoPage from './components/videoPage/VideoPage'
import NavBar from './components/navBar/NavBar'


// css
import './app.css'


// other
const apiKey = `AIzaSyAGe9XCQwCwMou1ZmanPOHB-aWo9nZES20`



class App extends Component {

    constructor() {
        super() 

        this.state = {
          browsing: false,
          vides: [],
          selectedVideo: {}
        }

        this.videoSearch = this.videoSearch.bind(this)

        this.handleScroll = this.handleScroll.bind(this)
        this.videoSearch = this.videoSearch.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
        
    }

    componentWillMount() {
      this.videoSearch("vox")
    }

    videoSearch(searchTerm) {
      axios.get(`http://localhost:3001/api/youtube/video?searchTerm=${searchTerm}`)
          .then( response => {
          console.log("res returned", response)
            this.setState({
              videos: response.data.items,
              selectedVideo: response.data.items[0]
            })
          }).catch( err => console.log(err) )
    }

    selectVideo(videoId) {
      axios.get(`http://localhost:3001/api/youtube/video?videoId=${videoId}`)
      .then( response => {
        console.log("All video info: ", response)
      })
    }



    handleScroll(e) {
        let top = e.srcElement.scrollingElement.scrollTop
        if (top > 300 && this.state.browsing === false) this.setState({browsing: true})
        else if (top < 300 && this.state.browsing) this.setState({browsing: false})
    }


  render() {
    return (
      <div className="App" >
      <VideoPlayer minify={this.state.browsing} video={this.state.selectedVideo} />
       
        <Router>
          <Switch>
              <Route exact path="/" component={VideoPage} vidInfo={this.state.selectedVideo.snippet}/>
              <Route path="*" component={VideoPage} vidInfo={this.state.selectedVideo.snippet} />
          </Switch>
        </Router>

        <NavBar videoSearch={this.videoSearch}  />
      </div>
    )
  }
}

export default App
