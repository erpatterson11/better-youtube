import React, { Component } from 'react'
import moment from 'moment'

import Util from "../../../../services/funcsService"

import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton'

import './videoDesc.css'



export default class VideoDesc extends Component {

    render() {

        const video = this.props.vidInfo
        const channel = this.props.channel
        const subbed = null

        const subbedStyle = {
            background: "rgb(238,238,238)",
            color: "rgba(17,17,17,0.6)",
        }

        const unsubbedStyle = {
            background: "rgb(255,0,0)",
            color: "rgb(255,255,255)"
        }

        if ( Util.checkEmptyObj(video) ) return <div></div>

        return (
            <div className="video-desc card">
                <div className="video-desc-header">
                    <div className="video-desc-avatar" >
                        <Avatar src={channel.snippet.thumbnails.default.url} />
                    </div>
                    <div className="video-desc-channel">
                        <p className="video-desc-channel-title" >{video.snippet.channelTitle}</p>
                        <p className="video-desc-publish-date" >Published on { moment(video.snippet.publishedAt).format("MMM D, YYYY") } </p>
                    </div>
                    <RaisedButton label={`Subscribe ${ Util.formatCounterText(channel.statistics.subscriberCount) }`} buttonStyle={ subbed ? subbedStyle : unsubbedStyle } labelColor="rgba(255,255,255)" />
                </div>
                <div className="video-desc-desc" > {video.snippet.description} </div>
                <Divider />
            </div>
        )
    }
}