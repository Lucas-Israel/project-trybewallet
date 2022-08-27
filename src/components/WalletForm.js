import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, walletformsubmit } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valueInput: '',
    descriptionInput: '',
    currencyInput: 'USD',
    methodInput: 'Dinheiro',
    tagInput: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  localStateHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submitHandler = () => {
    const { dispatch } = this.props;
    dispatch(walletformsubmit(this.state));
  };

  render() {
    const { currencies } = this.props;
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
    } = this.state;
    return (
      <form className="form">
        <label htmlFor="value-input">
          Valor:
          {' '}
          <input
            id="value-input"
            name="valueInput"
            data-testid="value-input"
            value={ valueInput }
            onChange={ this.localStateHandler }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          {' '}
          <input
            id="description-input"
            name="descriptionInput"
            data-testid="description-input"
            value={ descriptionInput }
            onChange={ this.localStateHandler }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          {' '}
          <select
            id="currency-input"
            name="currencyInput"
            data-testid="currency-input"
            value={ currencyInput }
            onChange={ this.localStateHandler }
          >
            {currencies.map((name) => <option key={ name }>{name}</option>)}
          </select>
        </label>
        <label htmlFor="method-input">
          Pagamento:
          {' '}
          <select
            id="method-input"
            name="methodInput"
            data-testid="method-input"
            value={ methodInput }
            onChange={ this.localStateHandler }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          {' '}
          <select
            id="tag-input"
            name="tagInput"
            data-testid="tag-input"
            value={ tagInput }
            onChange={ this.localStateHandler }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.submitHandler }>Adicionar despesa</button>
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
