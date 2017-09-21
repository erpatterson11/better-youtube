import React, { Component } from 'react'

import IconButton from 'material-ui/IconButton'
import MoreVert from 'material-ui/svg-icons/navigation/more-vert'


import './videoLinkCard.css'


export default class VideoLinkCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonIsShown: false,
            isVert: this.props.vertical ? "-vertical" : ""
        }
    }

    toggleButton = (bool) => {
        this.setState({buttonIsShown: bool})
    }   


    render() {

        let {video, setVideo, vertical} = this.props
        console.log(video);
        let image = video.snippet.thumbnails.medium

        const button = (
            <IconButton style={{padding: 0, height: "24px", width: "24px"}}>
                <MoreVert color="rgba(17,17,17,0.4)" hoverColor="rgb(17,17,17)" />
            </IconButton>
        )

        const renderButton = () => this.state.buttonIsShown && this.props.vertical ? button : null


        return (
            <div className={`video-link-card${this.state.isVert}`} onClick={ () => setVideo(video) } onMouseEnter={ () => this.toggleButton(true) } onMouseLeave={ () => this.toggleButton(false) } > 
                <div className={`video-link-pic${this.state.isVert}`} style={{backgroundImage: `url(${image.url})`}}>
                </div>
                <div className={`video-link-text${this.state.isVert}`}>
                    <div className={`video-link-title-container${this.state.isVert}`}>
                        <p className={`video-link-title${this.state.isVert}`}>{video.snippet.title}</p>
                        {renderButton()}
                    </div>
                    <p className={`video-link-channel${this.state.isVert}`}>{video.snippet.channelTitle}</p>
                    { vertical ? <p className={'video-link-channel-vertical'}>57K views * 2 days ago</p> : null }
                </div>
            </div> 
        )
    }
}


