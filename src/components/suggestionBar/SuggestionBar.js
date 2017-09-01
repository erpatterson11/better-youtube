import React, { Component } from 'react'
import VideoLinkCard from '../videoLinkCard/VideoLinkCard'

import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

import './suggestionBar.css'



export default class SideMenu extends Component {
    

    render() {
        
        let displaySuggestedVideos = (list) => {
            return list.map( (vid,i) => {
                return <VideoLinkCard key={i} video={vid} setVideo={this.props.setVideo} />
            })
        }

        return (
            <div className="suggestion-bar card">
                <div>UP Next       Toggle Auto Play</div>
                <br/>
                <br/>
                <br/>
                <br/>
                <Divider />
                { this.props.suggested.length > 0 ? displaySuggestedVideos(this.props.suggested) : "" }
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