import React, { Component } from 'react'

import "./navBar.css"

export default class NavBar extends Component {
    constructor(props) {
        super(props)


    }


    render() {

        return (
            <div className='nav-bar card flex-cont'>

                <div className='logo-container flex-cont'>
                    <div className="ham-menu"> </div>
                    <div className='logo'></div>
                </div>

                <div className="search-container flex-cont">
                    <input className="input-bar" type="text" placeholder="Search" />
                    <button className="search-button flex-cont">
                        <span className="search-glass">Search</span>
                    </button>
                </div>

                <div className="action-container flex-cont">
                    <button className="sign-in-button">
                        <span className="sign-in-content">Sign In</span>
                    </button>
                </div>
                
            </div>
        )
    }

}