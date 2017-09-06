import React, { Component } from 'react'

import Util from "../../services/funcsService"

import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'

import './videoDesc.css'



export default class VideoDesc extends Component {

    render() {

        let video = this.props.vidInfo

        if ( Util.checkEmptyObj(video) ) return <div></div>

        return (
            <div className="video-desc card">
                <div className="video-desc-header">
                    <div className="video-desc-avatar" >
                        <Avatar src="" />
                    </div>
                    <div className="video-desc-channel">
                        <p>{video.snippet.channelTitle}</p>
                        <p>published on </p>
                    </div>
                    <RaisedButton label="Subscribers" />
                </div>
                <div className="video-desc-desc" > {video.snippet.description} </div>
                <Divider />
            </div>
        )
    }
}