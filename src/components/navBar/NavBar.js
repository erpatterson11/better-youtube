import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as DockActions from '../../store/reducers/dockReducer'
import { getVideoSuggestions } from '../../store/reducers/selectedVideoReducer'

import SearchResults from '../searchResults/SearchResults'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import SearchIcon from 'material-ui/svg-icons/action/search'
          

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
                        <div className="ham-menu btn" onClick={this.props.toggleDock}> </div>
                        <div className='logo btn'></div>
                    </div>

                    <div className="search-container flex-cont">
                        <Paper className="input-container" zDepth={1}>
                            <form onSubmit={this.handleSubmit}>
                                <TextField id="search-input" className="input-bar" fullWidth={true} placeholder="Search" type="text" value={this.state.term} style={style} inputStyle={{paddingLeft: "15px"}} underlineShow={false} onChange={ e => this.handleTyping(e) } />
                            </form>
                            <SearchResults results={this.props.searchResults} nextPage={this.props.nextSearchToken} resultsDisplayed={this.state.resultsDisplayed}  closeResultsComponent={this.closeResultsComponent} setVideo={this.props.setVideo} getMore={this.props.getVideoSuggestions} />
                        </Paper>
                        <RaisedButton icon={<SearchIcon />} style={{borderTopLeftRaduis: "0px", borderBottomLeftRaduis: "0px"}} onClick={this.handleSubmit} />
                    </div>

                    <div className="action-container flex-cont">
                        <RaisedButton backgroundColor="#167ac6" label="Sign In" labelColor="#ffffff" onClick={() => window.location.href="http://localhost:3001/login"} />
                    </div>

                </Paper>
        )
    }

}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {...DockActions, getVideoSuggestions})(NavBar)