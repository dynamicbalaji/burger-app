import React from 'react';

import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer,  classes.Close];
    if(props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <>
            <Backdrop show={props.show} closeModal={props.clicked}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%" className={classes.Logo} />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
}

export default SideDrawer;