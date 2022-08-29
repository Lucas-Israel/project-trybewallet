import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, walletformsubmit, editedExpenseToStore } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
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

  submitHndl = () => {
    const { dispatch, editor } = this.props;
    const { id } = this.state;
    if (editor === false) {
      this.setState({ id: id + 1 });
      dispatch(walletformsubmit(this.state));
    }
    if (editor === true) {
      dispatch(editedExpenseToStore(this.state));
    }
    this.setState({ value: '', description: '' });
  };

  render() {
    const { currencies, editor } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <form className="form" style={ editor ? { backgroundColor: 'red' } : { } }>
        <label htmlFor="value-input">
          Valor:
          {' '}
          <input
            id="value-input"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.localStateHandler }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          {' '}
          <input
            id="description-input"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.localStateHandler }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          {' '}
          <select
            id="currency-input"
            name="currency"
            data-testid="currency-input"
            value={ currency }
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
            name="method"
            data-testid="method-input"
            value={ method }
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
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.localStateHandler }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.submitHndl }
        >
          {editor === false ? 'Adicionar despesa' : 'Editar despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ wallet: { editor, currencies, expenses } }) => ({
  currencies,
  expenses,
  editor,
});

export default connect(mapStateToProps)(WalletForm);
