import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: "Per Eriksson",
                street: "Trane",
                country: "Sweden"
            }
        }
        axios.post('/orders.json', order)
            .then(respose => {
                this.setState({loading: false, purchasing: false})
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false})
            })
    }

    render() {
        let form = (
        <form>
            <input type="text" name="name" placeholder="Your Name" className={classes.Input} />
            <input type="email" name="email" placeholder="Your Mail" className={classes.Input} />
            <input type="text" name="street" placeholder="Street" className={classes.Input} />
            <input type="text" name="postal" placeholder="Postal Code" className={classes.Input} />
            <Button btnType="Success">ORDER</Button>
        </form> 
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
               <h4>Enter your Contact Data</h4>
            </div>
        )
    }
}

export default ContactData
