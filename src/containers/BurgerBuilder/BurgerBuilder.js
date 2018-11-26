import React, { Component } from 'react';

import axios from '../../axios-order';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';

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
            ingredients: null,
            totalPrice: 3,
            purchasable: false,
            showModal: false,
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data, loading: false });
            })
            .catch(error => this.setState({ error: true }));
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
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Balaji Ashok Kumar',
                address: {
                    street: 'Test addr',
                    zipCode: '71212',
                    country: 'US'
                },
                email: 'test@gmail.com'
            },
            deliverMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, showModal: false });
            })
            .catch(error => {
                this.setState({ loading: false, showModal: false });
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; // [salad: true, bacon: false, ...]
        }
        let orderSummary = null,
            burger = this.state.error ?
                <p> Ingredients can't be loaded!</p >: <Spinner />;
        if (this.state.ingredients) {
            burger = <><Burger ingredients={this.state.ingredients} />
                <BuildControls addIngredient={this.addIngredientHandler}
                    removeIngredient={(type) => this.removeIngredientHandler(type)}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    showModal={this.showModalHandler} /></>;
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                cancel={this.cancelPurchaseHandler}
                continue={this.continuePurchaseHandler}
                total={this.state.totalPrice} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <>
                <Modal show={this.state.showModal} closeModal={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);