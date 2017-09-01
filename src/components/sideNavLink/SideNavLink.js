import React, { Component } from 'react'

import "./sideNavLink.css"

export default function SideNavLink({icon, text, counter}) {

    let trimText = (str) => {
        if (str.length > 30) {
            return str.substr(20).concat("...")
        }
    }

    return (
        <div className="side-nav-link-">
            <img src={icon} />
            <p>{trimText(text)} </p>
            <p>{counter ? counter : ""}</p>
        </div>
    )
}