import React, { Component } from 'react';
import StripeCheckout from  'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {

        return ( 
            <StripeCheckout
            name="H3rd"
            description="Donate to help keep the lights on"
            amount={500}
            token={token => this.props.handleToken(token)}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Donate
                </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);