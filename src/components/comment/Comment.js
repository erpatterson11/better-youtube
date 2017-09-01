// React modules
import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         key: "value"
    //     }

    //     // Bind custom methods

    // }

    // Lifecyle methods

    // componentWillMount() {

    // }

    // componentDidMount() {

    // }

    // componentWillUnmount() {

    // }

    // Custom methods

    
    // Render

    render() {

        let color = "rgba(17,17,17,0.6)"
        let hoverColor = "rgb(17,17,17)"

        let comment = this.props.comment
        let publishedAgo = this.props.publishedAgo


        if (!comment) return <div></div>

        return (
            <div className="comment-component">
                    <div  className="comment-avatar" >
                        <Avatar src={comment.authorProfileImageUrl} />
                    </div> 
                    <div className="comment-text-container" >
                        <div className="comment-author-date-cont" >
                            <p className="comment-author" > { comment.authorDisplayName } </p>
                            <p className="comment-time-ago" > { publishedAgo } </p>
                        </div>
                        <p className="comment-text" > { comment.textOriginal } </p>
                        <div className="comment-action-container" >
                            <p className="comment-reply-link"> REPLY </p>
                            <p> { comment.likeCount } </p>
                            <ThumbUp className="comment-thumb" height="16px" color={color} hoverColor={hoverColor}  />
                            <ThumbDown className="comment-thumb" height="16px" color={color} hoverColor={hoverColor} />
                        </div>  
                    <div className="comment-view-replies">
                        <p > view replies </p>
                        <DownArrow />
                    </div>                             
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