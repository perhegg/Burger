import React from 'react'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
        return <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
        })

    return (
        <>
            <h3>Your order</h3>
            <p>A delicious burger woth the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Proceed to checkout!</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </>
    )
}

export default orderSummary
