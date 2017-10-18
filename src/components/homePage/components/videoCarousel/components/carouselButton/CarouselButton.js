import React, { Component } from 'react'

// COMPONENTS
import FloatingActionButton from 'material-ui/FloatingActionButton'

import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'

// CSS
import './carouselButton.css'


class CarouselButton extends Component {

    constructor(props) {
        super(props) 
        this.state = {}

    }

    render() {
        return (
            <FloatingActionButton 
                onClick={this.props.move}
                backgroundColor="#ffffff" 
                mini={true} 
                style={{position: "absolute", [this.props.dir]: "-15px", top: "39px", display: this.props.show }} >
                { this.props.dir === "right" ? <ArrowRight style={{fill: "rgba(17,17,17,0.4)"}} /> : <ArrowLeft style={{fill: "rgba(17,17,17,0.4)"}} /> } 
            </FloatingActionButton>
        )
    }
}

// EXPORT

export default CarouselButton
