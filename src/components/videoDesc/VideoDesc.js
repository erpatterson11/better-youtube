import React, { Component } from 'react'

import Divider from 'material-ui/Divider'

import './videoDesc.css'



export default class VideoDesc extends Component {

    render() {
        return (
            <div className="video-desc card">
                <p>{}</p>
                <Divider />
            </div>
        )
    }
}