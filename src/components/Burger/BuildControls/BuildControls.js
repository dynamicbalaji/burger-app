import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <BuildControl />
        </div>
    );
}

export default BuildControls;