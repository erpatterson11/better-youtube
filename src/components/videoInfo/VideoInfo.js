import React, { Component } from 'react'

import Divider from 'material-ui/Divider'

import './videoInfo.css'



export default class VideoInfo extends Component {
   
  

    render() {
        return (
            <div className="video-info card">
                <p>{}</p>
                <Divider />
            </div>
        )
    }
}