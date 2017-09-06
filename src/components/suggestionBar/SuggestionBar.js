import React, { Component } from 'react'
import VideoLinkCard from '../videoLinkCard/VideoLinkCard'

import Toggle from 'material-ui/Toggle'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

import './suggestionBar.css'


export default class SideMenu extends Component {
    

    render() {
        
        const displaySuggestedVideos = (list) => {
            let suggList = list.slice(1)
            return suggList.map( (vid,i) => {
                return <VideoLinkCard key={i} video={vid} setVideo={this.props.setVideo} />
            })
        }

        const toggleLabelStyle = {
            color: "rgb(136,136,136)",
            fontSize: 13,
            fontWeight: 500
        }

        return (
            <div className="suggestion-bar card">
                <div className="suggestion-next-video">
                    <div className="suggestion-next-video-banner">
                        <p className="suggestion-next-text">Up Next</p>   
                        <Toggle label="AUTOPLAY" defaultToggled={true} style={{width: "auto"}} labelStyle={toggleLabelStyle}/>
                    </div>
                    <div className="suggestion-next-video-card">
                        {
                            this.props.suggested.length > 0 ? <VideoLinkCard video={this.props.suggested[0]} setVideo={this.props.setVideo} /> : ""
                        }
                    </div>
                    <Divider />
                </div>
                { 
                    this.props.suggested.length > 0 ? displaySuggestedVideos(this.props.suggested) : "" }
                {
                    //  <FlatButton label="SHOW MORE" fullWidth={true} backgroundColor="rgb(238,238,238)" labelStyle={{color: "rgba(136,136,136,0.8)" }} />
                 }
                <Paper zDepth={0}>
                    <button className="suggestion-show-more-btn">SHOW MORE</button>
                </Paper>
            </div>
        )
    }
}