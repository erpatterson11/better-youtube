import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import * as DockActions from '../../store/reducers/dockReducer'
import { getVideoSuggestions } from '../../store/reducers/selectedVideoReducer'

import SearchResults from '../searchResults/SearchResults'

import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'


import YtLogo from '../../images/youtube-logo'
import YtRedLogo from '../../images/youtube-red-logo'

import SearchIcon from 'material-ui/svg-icons/action/search'
import Menu from 'material-ui/svg-icons/navigation/menu'
import MoreVert from 'material-ui/svg-icons/navigation/more-vert'
import Apps from 'material-ui/svg-icons/navigation/apps'
import FileUpload from 'material-ui/svg-icons/file/file-upload'


import "./navBar.css"


class NavBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            term: "",
            resultsDisplayed: false
        }

        this.handleTyping = this.handleTyping.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.closeResultsComponent = this.closeResultsComponent.bind(this)
    }

    handleTyping(e) {
        this.setState({term: e.target.value})
        this.props.setBrowse(true)
    }

    handleSubmit() {
        this.props.videoSearch(this.state.term)
        this.setState({resultsDisplayed: true})
    }

    closeResultsComponent() {
        this.setState({resultsDisplayed: false, term: ""})
    }

    render() {

        let style = {
            height: "36px"
        }

        return (
            <Paper className='nav-bar card flex-cont' zDepth={1}>

                <div className='logo-container flex-cont'>
                    <IconButton icon  onClick={this.props.toggleDock} >
                        <Menu  color="rgba(17,17,17,0.4)" />
                    </IconButton>
                  
                    <Link to="/home">
                        <YtLogo height="24px" />
                    </Link>                    
                </div>

                <div className="search-container flex-cont">
                    <Paper className="input-container" zDepth={1}>
                        <TextField 
                            id="search-input" 
                            className="input-bar" 
                            fullWidth={true} 
                            placeholder="Search" 
                            type="text" 
                            value={this.state.term} 
                            style={style} 
                            inputStyle={{paddingLeft: "15px"}} 
                            underlineShow={false} 
                            onChange={ e => this.handleTyping(e) } 
                            onKeyUp={ e => {
                                e.preventDefault()
                                if (e.keyCode === 13) this.handleSubmit()
                            }}
                        />
                        <SearchResults 
                            results={this.props.searchResults} 
                            nextPage={this.props.nextSearchToken} 
                            resultsDisplayed={this.state.resultsDisplayed}  
                            closeResultsComponent={this.closeResultsComponent} 
                            setVideo={this.props.setVideo} 
                            getMore={this.props.getVideoSuggestions} 
                        />
                    </Paper>
                    <RaisedButton 
                        icon={<SearchIcon />} 
                        style={{borderTopLeftRaduis: "0px", borderBottomLeftRaduis: "0px"}} 
                        onClick={this.handleSubmit} 
                    />
                </div>

                <div className="action-container flex-cont">
                    <IconButton icon >
                        <FileUpload  color="rgba(17,17,17,0.4)" />
                    </IconButton>
                    <IconButton icon >
                        <Apps  color="rgba(17,17,17,0.4)" />
                    </IconButton>
                    <IconButton icon >
                        <MoreVert  color="rgba(17,17,17,0.4)" />
                    </IconButton>


                    <FlatButton  
                        label="Sign In" 
                        labelStyle={{color: "rgb(255,0,0)"}}
                        hoverColor={"rgb(255,255,255)"}
                        onClick={() => axios.get('/login').then(console.log)} 
                    />
                </div>

            </Paper>
        )
    }

}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {...DockActions, getVideoSuggestions})(NavBar)