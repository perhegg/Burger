import React, { Component } from 'react'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    componentWillUpdate() {
        console.log('Update')
    }
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
            return <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
            })

        return(
            <>
                <h3>Your order</h3>
                <p>A delicious burger woth the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p> <strong>Total Price: {this.props.price.toFixed(2)} </strong></p>
                <p>Proceed to checkout!</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </>
        )
    }
}

export default OrderSummary
