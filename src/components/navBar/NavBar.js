import React, { Component } from 'react'

import "./navBar.css"

export default class NavBar extends Component {
    constructor(props) {
        super(props)


    }


    render() {

        return (
            <div className='nav-bar card'>
                <div class="ham-menu"> </div>
                <div class='logo'></div>
                <input type="text" />
                <button class="search-button"></button>
                <button class="sign-in-button">Sign In</button>
            </div>
        )
    }

}