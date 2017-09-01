// React
import React, { Component } from 'react'

// Custom components

// Material components
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

// Material Icons

// CSS
import './commentEntry.css'


// Component
export default class CommentEntry extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comment: "",
            showCommentButtons: "",
            commentDisabled: true
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(e) {
        this.setState({comment: e.target.value, commentDisabled: e.target.value ? false : true})
    }


    render() {  

        return (
            <div className="comment-entry">
                <div className="comment-avatar-input" >
                    <div className="comment-author-avatar" >
                        <Avatar />
                    </div>
                    <div className="comment-input">
                        <TextField id="comment-input" onChange={this.handleInputChange} value={this.state.comment} multiLine={true} fullWidth={true} hintText="Add a public comment" />
                    </div>
                </div>
                <div className="comment-btn-container">
                    <FlatButton label="CANCEL" onClick={() => this.setState({comment: ""})} />
                    <FlatButton label="COMMENT" backgroundColor="rgb(38,147,230)" hoverColor="rgb(38,147,230)" style={{color: '#ffffff'}} disabled={this.state.commentDisabled} />
                </div>
            </div>
        )
    }
}