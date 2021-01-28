import React, { useState, useEffect, useCallback } from 'react';
import Burger from '../components/Burger/Burger';
import { useDispatch, useSelector } from "react-redux"
import axios from '../axios-orders'

import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/Modal'
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../components/UI/Spinner/Spinner'
import withErrorHandler from '../components/hoc/withErrorHandler/withErrorHandler'
import * as actions from '../store/actions/index'

const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false)

    const ings = useSelector(state => state.burgerBuilder.ingredients)
    const prc = useSelector(state => state.burgerBuilder.totalPrice)
    const error = useSelector(state => state.burgerBuilder.error)


    const dispatch = useDispatch()

    const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName))
    const onIngredientRemoved = ingName => dispatch(actions.removeIngredient(ingName))
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [])
    const onInitPurchase = () => dispatch(actions.purchaseInit())

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        onInitPurchase()
        props.history.push('/checkout')
    }

    const purchaseHandler = () => {
        setPurchasing(true)
    }

    const disabledInfo = {
        ...ings
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    let burger = error ? <p>Can't load ingredients.</p> : <Spinner />
    if (ings) {
        burger = (
            <>
                <Burger ingredients={ings} />
                <BuildControls
                    ingAdded={onIngredientAdded}
                    ingDeducted={onIngredientRemoved}
                    disabled={disabledInfo}
                    price={prc}
                    ordered={purchaseHandler} />
            </>
        )
        orderSummary = (
            <OrderSummary
                ingredients={ings}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                price={prc} />
        )
    }

    return (
        <>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </>
    )

};

export default withErrorHandler(BurgerBuilder, axios)