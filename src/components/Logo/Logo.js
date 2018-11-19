import React from 'react';

import classes from './Logo.module.css';
import browserLogo from '../../assets/images/burger-logo.png';

const Logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={browserLogo} alt="Burger App"/>
        </div>
    );
}

export default Logo;