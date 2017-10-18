import React, { Component } from 'react'

// MODULES

// COMPONENTS,
import RecommendedCarousel from './components/recommendedCarousel/RecommendedCarousel'
import VideoLinkCard from '../videoLinkCard/VideoLinkCard'

import Divider from 'material-ui/Divider'


// REDUX
import { connect } from 'react-redux'
import * as videoReducerActions from '../../store/reducers/selectedVideoReducer'


// OTHER

// CSS
import "./homePage.css"

class HomePage extends Component {

    // LIFECYCLE FUNCS
    constructor(props) { // define state and biind methods
        super(props) // defines props in constructor, reduces bugs
        this.state = {}
        // BIND CUSTOM FUNCS
        // ( (comp, funcsList) => {
        //     funcsList.forEach( func => comp.func = func.bind(comp) )
        // } )(this, [])
    }

    // componentWillMount() {} // is run before mounting. setState won't trigger re-render. avoid side-effects or subscriptions
    // componentDidMount() {} // is run after mounting. target DOM nodes here. load async data here. 
    // componentWillReceiveProps(nextProps) {} // is run before props changed or parent triggers rerender. use to setState. may run when new props aren't received.
    // shouldComponentUpdate(nextProps, nextState) {} // is run before props or state change triggers rerender. return false to stop component rerender 
    // componentWillUpdate(nextProps, nextState) {} // is run after new props or state are received and comp will rerender. can't call setState
    // componentDidUpdate() {} // is run after initial rerender. operate on DOM. make network requests if state or props changed
    // componentWillUnmount() {} // is run after component unmounts. cancel timers, event listeners, network requests, destroy manually created DOM elements, etc...

    // CUSTOM FUNCS

    // RENDER

    render() {

        const handleSetVideo = (video) => {
            this.props.getVideoStats(video.id.videoId)
            this.props.getVideoSuggestions( video.id.videoId )
            this.props.getChannelStats( video.snippet.channelId )
            console.log(video);
        }

        return (
            <div className="home-page-container">
                <RecommendedCarousel handleSetVideo={handleSetVideo} />
                <Divider />
                <RecommendedCarousel handleSetVideo={handleSetVideo}/>
                <Divider />
                <RecommendedCarousel handleSetVideo={handleSetVideo}/>
                <p>This is the home page</p>
            </div>
        )
    }
}

// REDUX

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps() {

}

// EXPORT

// export default HomePage

// REDUX EXPORT

export default connect( mapStateToProps, videoReducerActions )(HomePage)