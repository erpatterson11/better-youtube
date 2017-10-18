import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVert from 'material-ui/svg-icons/navigation/more-vert'


import './videoLinkCard.css'


export default class VideoLinkCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonIsShown: false,
            buttonMenuIsOpen: false,
            isVert: this.props.vertical ? "-vertical" : ""
        }
    }

    toggleButton(bool) {
        this.setState({buttonIsShown: bool})
        // // if mouse is hovering show button
        // if (!this.state.buttonIsShown) {
        //     this.setState({buttonIsShown: true})
        // }
        // // if mouse is leaving and button isn't open hide button
        // if (!this.state.buttonMenuIsOpen && this.state.buttonIsShown) {
        //     this.setState({buttonIsShown: bool})
        // }

        // // if mouse is leaving and button is open do nothing
        //  else if (!this.state.button) {

        // }
    }   


    render() {

        let {video, setVideo, vertical} = this.props
        let image = video.snippet.thumbnails.medium

        const button = (
            <IconMenu 
                iconButtonElement={
                    <IconButton style={{padding: 0, height: "24px", width: "24px"}}>
                        <MoreVert color="rgba(17,17,17,0.4)" hoverColor="rgb(17,17,17)" />
                    </IconButton>
                }
                onRequestChange={(open) => this.setState({buttonMenuIsOpen: open})}
                >
                <MenuItem primaryText="Not interested" />
                <MenuItem primaryText="Add to Watch later"/>
                <MenuItem primaryText="Add to playlist" />
            </IconMenu>
        )

        return (
            <div className={`video-link-card${this.state.isVert}`} onMouseEnter={ () => this.toggleButton(true) } onMouseLeave={ () => this.toggleButton(false) } > 
                <Link to="/watch">
                    <div className={`video-link-pic${this.state.isVert}`} onClick={ () => setVideo(video) } style={{backgroundImage: `url(${image.url})`}}></div>
                </Link>
                <div className={`video-link-text${this.state.isVert}`}>
                    <div className={`video-link-title-container${this.state.isVert}`}>
                    <Link to="/watch">
                        <p className={`video-link-title${this.state.isVert}`} onClick={ () => setVideo(video) } >{video.snippet.title}</p>
                    </Link>
                        {this.state.buttonIsShown ? button : null}
                    </div>
                    <p className={`video-link-channel${this.state.isVert}`}>{video.snippet.channelTitle}</p>
                    { vertical ? <p className={'video-link-details-vertical'}>57K views * 2 days ago</p> : null }
                </div>
            </div> 
        )
    }
}


