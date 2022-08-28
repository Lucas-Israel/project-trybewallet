import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <div className="header">
        <div data-testid="email-field">
          Usuario:
          {' '}
          {email}
        </div>
        <div className="valorDeGasto">
          Total de gastos:
          {' '}
          <div data-testid="total-field">
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
