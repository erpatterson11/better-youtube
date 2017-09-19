import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as DockActions from '../../store/reducers/dockReducer'
import { getVideoSuggestions } from '../../store/reducers/selectedVideoReducer'

import SearchResults from '../searchResults/SearchResults'

import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'


import YtLogo from '../../images/youtube-logo'
import YtRedLogo from '../../images/youtube-red-logo'

import SearchIcon from 'material-ui/svg-icons/action/search'
import Menu from 'material-ui/svg-icons/navigation/menu'


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
                        <Menu  color="rgba(17,17,17,0.4" />
                    </IconButton>
                    <YtLogo height="24px" />
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
                    <RaisedButton 
                        backgroundColor="#167ac6" 
                        label="Sign In" 
                        labelColor="#ffffff" 
                        onClick={() => window.location.href="http://localhost:3010/login"} 
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