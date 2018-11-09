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
            <p>Current Price: <strong>$ {props.price.toFixed(2)}</strong></p>
            {controls.map( (control) => {
                return <BuildControl key={control.label} label={control.label}
                addIngredient={() => props.addIngredient(control.type)}
                removeIngredient={() => props.removeIngredient(control.type)} 
                disabledInfo={props.disabledInfo[control.type]}/>
            })}
            <button className={classes.OrderButton}
                disabled={!props.purchasable}>ORDER NOW</button>
        </div>
    );
}

export default BuildControls;