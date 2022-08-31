import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import trybeicon from '../images/trybeIcon.png';

class Header extends Component {
  state = {
    coin: 'BRL',
  };

  render() {
    const { coin } = this.state;
    const { email, expenses } = this.props;
    const zero2Decimais = 0.001;
    const soma = expenses.length > 0 ? expenses
      .map(({
        currency,
        value,
        exchangeRates }) => (+value) * exchangeRates[currency].ask)
      .reduce((a, b) => a + b).toFixed(2) : 0;
    return (
      <div
        className="d-flex d-flex bg-gradient
        justify-content-between pt-1 pb-1
        align-items-center"
        style={ { backgroundColor: 'rgb(210, 210, 210)' } }
      >
        <div className="d-flex align-items-center">
          <img
            src={ trybeicon }
            alt="Trybe Icon"
            className=""
            style={ { height: '40px', paddingLeft: '20px', paddingRight: '40px' } }
          />
          <div
            data-testid="email-field"
            style={ { paddingLeft: '80px', fontWeight: 'bold' } }
            className="text-dark d-flex"
          >
            <div className="me-2">
              Usuario:
            </div>
            {email}
          </div>
        </div>
        <div
          className="d-flex text-dark"
          style={ { paddingRight: '20px', fontWeight: 'bold' } }
        >
          Total de gastos:
          <div data-testid="total-field" style={ { marginLeft: '10px' } }>
            {soma === 0 ? zero2Decimais.toFixed(2) : soma}
          </div>
          <div id="header-currency-field" data-testid="header-currency-field">
            {coin}
          </div>
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  expenses: [],
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

const mapStateToProps = ({
  user: { email },
  wallet: { expenses } }) => ({
  email,
  expenses,
});

export default connect(mapStateToProps)(Header);
