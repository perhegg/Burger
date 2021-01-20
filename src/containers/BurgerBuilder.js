import React, { Component } from 'react';
import Burger from '../components/Burger/Burger';
import { connect } from "react-redux"
import axios from '../../axios-orders'

import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/Modal'
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../components/UI/Spinner/Spinner'
import withErrorHandler from '../components/hoc/withErrorHandler/withErrorHandler'
import * as burgerBuilderActions from '../store/actions/index'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.state.error ? <p>Can't load ingredients.</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingAdded={this.props.onIngredientAdded}
                        ingDeducted={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.prc}
                        ordered={this.purchaseHandler} />
                </>
            )
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.prc} />
            )
        }

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        )
    };
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        prc: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))