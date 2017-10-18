// React
import React, { Component } from 'react'
import moment from 'moment'

// Services

import Util from '../../../../services/funcsService'

// Custom components
import Comment from '../comment/Comment'
import CommentEntry from '../commentEntry/CommentEntry'

// Material Icons
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import Sort from 'material-ui/svg-icons/content/sort'
import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper'

// CSS
import './comments.css'


// Component
export default class Comments extends Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.comments !== this.props.comments
    }

    render() {

        let displayComments = () => this.props.comments.map( (comment,i) => <Comment key={i + comment.id} comment={comment.snippet} publishedAgo={moment( moment(comment.publishedAt) ).fromNow()} />)        

        if (this.props.loading || this.props.comments.length === 0) return <div className="progress-container"><CircularProgress /></div>

        return (
            <div className="comments card">
                <div className="comments-toolbar"> 
                    <p className="comments-total">{ Util.formatCounterText(this.props.video.statistics.commentCount) } Comments</p>
                    <IconMenu iconButtonElement={<IconButton><Sort color="rgba(17,17,17,0.4)" /></IconButton>} >
                        <MenuItem primaryText="Top comments" />
                        <MenuItem primaryText="Newest first" />
                    </IconMenu>
                </div>
                <CommentEntry />
                { Object.keys(this.props.comments).length > 0 ? displayComments() : "" }
            </div>
        )
    }
}