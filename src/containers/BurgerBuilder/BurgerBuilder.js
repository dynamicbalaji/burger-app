import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.3,
    meat: 1.3
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 3,
            purchasable: false,
            showModal: false
        };
    }

    updatePurchaseState(ing) {
        const sum = Object.keys(ing)
            .map(ingKey => {
                return ing[ingKey];
            })
            .reduce((tot, el) => {
                return tot + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIng = {
            ...this.state.ingredients
        }
        updatedIng[type] = newCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIng,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIng);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const newCount = oldCount - 1;
        const updatedIng = {
            ...this.state.ingredients
        }
        updatedIng[type] = newCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIng,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIng);
    }

    showModalHandler = () => {
        this.setState({ showModal: true });
    }

    cancelPurchaseHandler = () => {
        this.setState({ showModal: false });
    }

    continuePurchaseHandler = () => {
        alert('You continue');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; // [salad: true, bacon: false, ...]
        }
        return (
            <>
                <Modal show={this.state.showModal} closeModal={this.cancelPurchaseHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                        cancel={this.cancelPurchaseHandler}
                        continue={this.continuePurchaseHandler}
                        total={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls addIngredient={this.addIngredientHandler}
                    removeIngredient={(type) => this.removeIngredientHandler(type)}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    showModal={this.showModalHandler} />
            </>
        );
    }
}

export default BurgerBuilder;