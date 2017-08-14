import React, { Component } from 'react'

import './videoPlayer.css'



export default class VideoPlayer extends Component {
    constructor(props) {
        super(props) 
        console.log(this.props.minify)
    }

    browseStyle = {
        position: "fixed",
        right: 0,
        bottom: 0,
        width: "416px",
        height: "200px"
    }


    render() {
        return (
            <div className="video-player-container card" style={this.props.minify ? this.browseStyle : null} >
                <video className={`video-player`}  src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164" />
            </div>
        )
    }
}