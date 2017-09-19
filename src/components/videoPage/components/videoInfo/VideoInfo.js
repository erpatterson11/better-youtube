import React, { Component } from 'react'

import PercentageBar from '../percentageBar/PercentageBar'

import Util from '../../../../services/funcsService'

import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import Slider from 'material-ui/Slider'
import Popover from 'material-ui/Popover'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'


import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import Share from 'material-ui/svg-icons/content/reply'
import PlaylistAdd from 'material-ui/svg-icons/av/playlist-add'
import MoreHoriz from 'material-ui/svg-icons/navigation/more-horiz'

import './videoInfo.css'

                            // <Slider min={0} max={ likes + dislikes } step={1} defaultValue={ likes } disableFocusRipple sliderStyle={{color: "white"}}/>


export default class VideoInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shareOpen: false,
            playlistOpen: false,
            playlistAnchor: null,
            shareAnchor: null
        }

        this.handlePlaylistOpen = this.handlePlaylistOpen.bind(this)
        this.handleShareOpen = this.handleShareOpen.bind(this)
    }
   
    handlePlaylistOpen = (e) => {
        this.setState({playlistOpen: true, playlistAnchor: e.currentTarget})
    }

    handleShareOpen = (e) => {
        this.setState({shareOpen: true, shareAnchor: e.currentTarget})
    }

    handlePopoverClose(e) {
        this.setState({[`${e}Open`]: false})
    }

    render() {

        const video = this.props.vidInfo

        const iconFill = "rgba(17,17,17,0.4)"
        const iconSize = 20
        const likesTotalWidth = 135

        if (Util.checkEmptyObj(video)) return <div></div>

        const likes = +video.statistics.likeCount
        const dislikes = +video.statistics.dislikeCount


        return (
            <div className="video-info card">
                <div className="video-artist-title"> { video.hasOwnProperty("id") ? video.snippet.title : ""}</div>
                <div className="video-stats-actions">
                    <p className="video-view-count">
                    {  Util.formatCounterText(video.statistics.viewCount, true) } views
                    </p>
                    <div className="video-actions"  >
                        <div className="video-actions-thumbs" style={{width: likesTotalWidth}} >
                            <div className="video-icon-text" >
                                <ThumbUp color={iconFill} style={{height: iconSize}} />
                                <p>{ Util.formatCounterText(video.statistics.likeCount) }</p>
                            </div>
                            <div className="video-icon-text" >
                                <ThumbUp color={iconFill} style={{height: iconSize}} />
                                <p>{ Util.formatCounterText(video.statistics.dislikeCount) }</p>
                            </div>
                        </div>
                        <FlatButton onClick={this.handleShareOpen} label="SHARE" style={{color: iconFill}} icon={<Share color={iconFill} style={{height: iconSize}} />} >
                        </FlatButton>
                        <IconButton onClick={this.handlePlaylistOpen} ><PlaylistAdd color={iconFill} style={{height: iconSize}} /></IconButton>
                        <Popover 
                            open={this.state.playlistOpen}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.handleRequestClose}>
                        </Popover>
                        <IconMenu iconButtonElement={<IconButton><MoreHoriz color={iconFill} style={{height: 24}} /></IconButton>} >
                        </IconMenu>
                    </div>
                </div>
                <PercentageBar val={likes / (likes + dislikes)} totalWidth={likesTotalWidth}  />
                <Divider />
            </div>
        )
    }
}