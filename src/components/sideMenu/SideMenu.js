import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as DockActions from '../../store/reducers/dockReducer'


// Material-UI Components
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

// Material-UI Icons
import HamMenu from 'material-ui/svg-icons/navigation/menu'
import Home from 'material-ui/svg-icons/action/home'
import WhatsHot from 'material-ui/svg-icons/social/whatshot'
import Subscriptions from 'material-ui/svg-icons/av/subscriptions'

import History from 'material-ui/svg-icons/action/history'
import WatchLater from 'material-ui/svg-icons/action/watch-later'
import LocalOffer from 'material-ui/svg-icons/maps/local-offer'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'

import Settings from 'material-ui/svg-icons/action/settings'
import Help from 'material-ui/svg-icons/action/help'
import Feedback from 'material-ui/svg-icons/action/feedback'
import Movies from 'material-ui/svg-icons/maps/local-movies'


import Download from 'material-ui/svg-icons/file/file-download'


import './sideMenu.css'

class SideMenu extends Component {

    render() {
        return (
            <Drawer docked={false} open={this.props.dock.isOpen} onRequestChange={(open) => this.props.toggleDock({open})} >
                <Menu>
                    <MenuItem leftIcon={<HamMenu />} onClick={this.props.closeDock} />
                    <Divider />
                    <MenuItem leftIcon={<Home />} primaryText="Home" onClick={this.props.closeDock} />
                    <MenuItem leftIcon={<WhatsHot />} primaryText="Fire vids" onClick={this.props.closeDock} />
                    <MenuItem leftIcon={<Subscriptions />} primaryText="Subscriptions" onClick={this.props.closeDock} />
                    <MenuItem leftIcon={<ThumbUp />} primaryText="YouTube Originals" onClick={this.props.closeDock} />
                    <Divider />
                    <MenuItem primaryText="LIBRARY" />
                    <MenuItem leftIcon={<History />} primaryText="History" onClick={this.props.closeDock} />
                    <MenuItem leftIcon={<WatchLater />} primaryText="Watch later" onClick={this.props.closeDock} />
                    <MenuItem leftIcon={<LocalOffer />} primaryText="Purchases" onClick={this.props.closeDock} />
                    <MenuItem leftIcon={<ThumbUp />} primaryText="Liked videos" onClick={this.props.closeDock} />
                    <Divider />
                    <MenuItem primaryText="SUBSCRIPTIONS" />
                    <MenuItem leftIcon={<Download />} primaryText="History" onClick={this.props.closeDock} />
                    <MenuItem leftIcon={<Download />} primaryText="Watch later" onClick={this.props.closeDock} />
                    <MenuItem leftIcon={<Download />} primaryText="Purchases" onClick={this.props.closeDock} />
                    <MenuItem leftIcon={<Download />} primaryText="Liked videos" onClick={this.props.closeDock} />
                    <Divider />
                    <MenuItem leftIcon={<Movies />} primaryText="YouTube Movies" onClick={this.props.closeDock} />
                    <Divider />
                    <MenuItem leftIcon={<Settings />} primaryText="Settings" onClick={this.props.closeDock} />
                    <MenuItem leftIcon={<Help />} primaryText="Help" onClick={this.props.closeDock} />
                    <MenuItem leftIcon={<Feedback />} primaryText="Send Feedback" onClick={this.props.closeDock} />
                    <Divider />
                </Menu>
            </Drawer>
        )
    }
}

function mapStateToProps(state) {
    return {
        dock: state.dockReducer
    }
}


export default connect(mapStateToProps, DockActions)(SideMenu)