import React, { Component } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from './../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

class Layout extends Component {

    constructor(props){
        super(props);

        this.state = {
            showSideDrawer: true
        };
    }

    openSideDrawerHandler = () => {
        this.setState({showSideDrawer: !this.state.showSideDrawer});
    }

    render() {
        return (
            <>
                <Toolbar />
                <SideDrawer clicked={this.openSideDrawerHandler} show={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default Layout;