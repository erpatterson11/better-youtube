import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { setBrowse , setBrowsePlaying} from '../../store/reducers/browseReducer'

import './videoPlayer.css'

class VideoPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            watch: false
        }

        this.handleScroll = this.handleScroll.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        let nextTop = nextProps.windowDimensions.scrollTop;
        if (nextTop !== this.props.windowDimensions.scrollTop) {
          this.handleScroll(nextTop);
        }
      }

    handleScroll(nextTop) {
    
        const {browse,match} = this.props

        let totalHeight = document.documentElement.scrollHeight;
        let clientHeight = document.documentElement.clientHeight;
        if ((( nextTop > 15) && browse.browsing === false) || !match.path.search(/(watch)/gi))
          this.props.setBrowse(true);
        else if ((( nextTop < 15) && browse.browsing) || !match.path.search(/(watch)/gi))
          this.props.setBrowse(false);
      }
    

    render() {

        const video = this.props.videos.selectedVideo
        const minify = this.props.browse.browsing
        const windowDim = this.props.windowDimensions

        const win = windowDim.windowDim
        const placeholder = windowDim.vidPlaceholder


        const browseStyle = {
            transform: `translate(${win.width - (placeholder.width * 0.75) - 20}px,${win.height - (placeholder.height * 0.75) - 20}px) scale(0.5)`,
            boxShadow: "rgba(0, 0, 0, 0.2) -3px -3px 10px 0px",
        }

        const staticStyle = {
            transform: `translate(${placeholder.left}px,${placeholder.top}px)`,
        }

        const id = video ? video.id : ""
    
        return (
            <div className="video-player-container card" style={minify ? browseStyle : staticStyle} >
                <iframe className={`video-player`}  src={`https://www.youtube.com/embed/${id}`} frameBorder="0" allowFullScreen />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        windowDimensions: state.windowSizeReducer,
        browse: state.browseReducer,
        videos: state.selectedVideoReducer
    }
}

export default withRouter(connect(mapStateToProps, {setBrowse})(VideoPlayer))