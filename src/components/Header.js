import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    gasto: 0,
    coin: 'BRL',
  };

  render() {
    const { gasto, coin } = this.state;
    const { email } = this.props;
    return (
      <div className="header">
        <div data-testid="email-field">
          Usuario:
          {' '}
          {email}
        </div>
        <div className="valorDeGasto">
          <div data-testid="total-field">
            Total de gastos:
            {' '}
            { gasto }
          </div>
          <div id="header-currency-field" data-testid="header-currency-field">
            {coin}
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

export default connect(mapStateToProps)(Header);
