import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            {controls.map( (control) => {
                return <BuildControl key={control.label} label={control.label}/>
            })}
        </div>
    );
}

export default BuildControls;