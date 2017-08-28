import React, { Component } from 'react'

import SearchResults from '../searchResults/SearchResults'

import "./navBar.css"

export default class NavBar extends Component {

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
        this.state.resultsDisplayed ? this.props.setBrowse(true) : this.props.setBrowse(false)
    }

    handleSubmit() {
        this.props.videoSearch(this.state.term)
        this.setState({term: "", resultsDisplayed: true})
    }

    closeResultsComponent() {
        console.log('blue event fired')
        this.setState({resultsDisplayed: false})
    }

    render() {

        return (
                <div className='nav-bar card flex-cont'>

                    <div className='logo-container flex-cont'>
                        <div className="ham-menu btn"> </div>
                        <div className='logo btn'></div>
                    </div>

                    <div className="search-container flex-cont">
                        <div className="input-container">
                            <input className="input-bar" type="text" placeholder="Search" value={this.state.term} onChange={ e => this.handleTyping(e) }/>
                            <SearchResults results={this.props.searchResults} resultsDisplayed={this.state.resultsDisplayed}  closeResultsComponent={this.closeResultsComponent} setVideo={this.props.setVideo}/>
                        </div>
                        <button className="search-button flex-cont btn" onClick={ () => this.handleSubmit() }>
                            <span className="search-glass">Search</span>
                        </button>
                    </div>

                    <div className="action-container flex-cont">
                        <button className="sign-in-button btn" onClick={() => window.location.href="http://localhost:3001/login"}>
                            <span className="sign-in-content">Sign In</span>
                        </button>
                    </div>

                </div>
        )
    }

}