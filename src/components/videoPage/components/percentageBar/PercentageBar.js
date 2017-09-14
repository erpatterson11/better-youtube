import React, { Component } from 'react'

import './percentageBar.css'

export default function PercentageBar({val, totalWidth}) {

        let style = {
            width: val*totalWidth
        }


        return (
            <div className="percentage-bar-component" >
                <div className="percentage-bar-placeholder" ></div>
                <div className="percentage-bar-container" style={{width: totalWidth}}>
                    <div className="percentage-bar-fill" style={style}></div>
                </div>
            </div>
        )
}