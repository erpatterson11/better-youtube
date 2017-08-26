import React, { Component } from 'react'

import "./navBar.css"

export default class NavBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            term: ""
        }
    }

    render() {

        return (
            <div className='nav-bar card flex-cont'>

                <div className='logo-container flex-cont'>
                    <div className="ham-menu btn"> </div>
                    <div className='logo btn'></div>
                </div>

                <div className="search-container flex-cont">
                    <input className="input-bar" type="text" placeholder="Search" value={this.state.term} onChange={ e => this.setState({term: e.target.value})}/>
                    <button className="search-button flex-cont btn" onClick={() => this.props.videoSearch(this.state.term)}>
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