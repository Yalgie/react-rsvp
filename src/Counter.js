import React from 'react';
import PropTypes from 'prop-types';

const Counter = props => {
    return(
        <table className="counter">
            <tbody>
                <tr>
                    <td>Attending:</td>
                    <td>{props.numberAttending}</td>
                </tr>
                <tr>
                    <td>Unconfirmed:</td>
                    <td>{props.numberUncomfirmed}</td>
                </tr>
                <tr>
                    <td>Total:</td>
                    <td>{props.numberInvited}</td>
                </tr>
            </tbody>
        </table>
    )
}

Counter.propTypes = {
    numberAttending: PropTypes.number,
    numberInvited: PropTypes.number,
    numberUncomfirmed: PropTypes.number
}

export default Counter;