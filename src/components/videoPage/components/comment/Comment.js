// React modules
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getVideoReplyComments } from '../../../../services/searchService'

// Redux 



// Components


// Other Modules
import Avatar from 'material-ui/Avatar'

import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'


// CSS
import "./comment.css"

class Comment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showingMore: false,
            commentHeight: 0,
            commentReplies: []
        }
        this.getVideoReplyComments = this.getVideoReplyComments.bind(this)
    }

    componentDidMount() {
        const height = this.refs.commentText.clientHeight
        this.setState({commentHeight: height})
    }

    getVideoReplyComments() {
        getVideoReplyComments(this.props.comment.topLevelComment.id)
            .then( comments => this.setState({commentReplies: comments}, () => console.log(this.state)) )
    }
    
    // Render
    render() {

        let color = "rgba(17,17,17,0.6)"
        let hoverColor = "rgb(17,17,17)"

        let comment = this.props.comment
        if (!comment) return <div></div>
        let publishedAgo = this.props.publishedAgo

        const showMoreStyle = this.state.showingMore ? {height: "auto", overflowY: "auto"} : {maxHeight: 100, overflowY: "hidden"}
        const showMoreCommentStyle = this.state.showingMore ? {height: "auto", overflowY: "auto"} : {maxHeight: 85, overflowY: "hidden"}
        const showMoreLabel = this.state.showingMore ? "Show less" : "Show more"

        const { authorProfileImageUrl, authorDisplayName, textOriginal, likeCount} = comment.topLevelComment.snippet


        return (
            <div className="comment-component">
                    <div  className="comment-avatar" >
                        <Avatar src={authorProfileImageUrl} />
                    </div> 
                    <div className="comment-text-container" >
                        <div className="comment-author-date-cont" >
                            <p className="comment-author" > { authorDisplayName } </p>
                            <p className="comment-time-ago" > { publishedAgo } </p>
                        </div>
                        <div style={showMoreStyle}>
                            <p style={showMoreCommentStyle} ref="commentText" className="comment-text" > 
                                { textOriginal } 
                            </p>
                        { this.state.commentHeight >= 85 &&
                            <p className="comment-show-more-label" onClick={() => this.setState({showingMore: !this.state.showingMore})}>{showMoreLabel}</p>
                        }
                        </div>
                        <div className="comment-action-container">
                            <p className="comment-reply-link"> REPLY </p>
                            <p> { likeCount } </p>
                            <ThumbUp className="comment-thumb" height="16px" color={color} hoverColor={hoverColor}  />
                            <ThumbDown className="comment-thumb" height="16px" color={color} hoverColor={hoverColor} />
                        </div>  
                        { comment.totalReplyCount && <div className="comment-view-replies" onClick={this.getVideoReplyComments}> <p> view all {comment.totalReplyCount} replies </p>  <DownArrow /> </div> }                             
                </div>
            </div>
        )

    }


}

export default Comment

// function mapStateToProps(state) {
//     return {
//         state: state
//     }
// }


// export default connect(mapStateToProps, ReduxActions)(ComponentName)