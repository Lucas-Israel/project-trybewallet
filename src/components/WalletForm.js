import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form className="form">
        <label htmlFor="value-input">
          Valor:
          {' '}
          <input id="value-input" data-testid="value-input" />
        </label>
        <label htmlFor="description-input">
          Descrição:
          {' '}
          <input id="description-input" data-testid="description-input" />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          {' '}
          <select id="currency-input" data-testid="currency-input">
            {currencies.map((name) => <option key={ name }>{name}</option>)}
          </select>
        </label>
        <label htmlFor="method-input">
          Pagamento:
          {' '}
          <select id="method-input" data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          {' '}
          <select id="tag-input" data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

export default connect(mapStateToProps)(WalletForm);
