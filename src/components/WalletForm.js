import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchAPI,
  walletformsubmit,
  editedExpenseToStore, turnOffStoreToForm, turnOffCancel } from '../redux/actions';

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
    const { dispatch, expenses } = this.props;
    const { id } = this.state;
    dispatch(fetchAPI());
    this.setState({ id: expenses.length });
    if (id !== expenses.length) this.setState({ id: expenses.length });
  }

  componentDidUpdate() {
    this.storeToForm();
    this.turnCancelOff();
    const { expenses, editor } = this.props;
    const { id } = this.state;
    if (!editor && id !== expenses.length) this.setState({ id: expenses.length });
  }

  localStateHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submitHndl = () => {
    const { dispatch, editor } = this.props;
    if (editor === false) {
      dispatch(walletformsubmit(this.state));
    }
    if (editor === true) {
      const { expenses } = this.props;
      dispatch(editedExpenseToStore(this.state));
      this.setState({ id: expenses.length * 2 + 1 });
    }
    this.setState({ value: '', description: '' });
  };

  storeToForm = () => {
    const { storeToForm } = this.props;
    if (storeToForm === true) {
      const { dispatch, expenses, idToEdit } = this.props;
      dispatch(turnOffStoreToForm);
      const expense = expenses.find((obj) => obj.id === idToEdit);
      this.setState({
        id: expense.id,
        value: expense.value,
        description: expense.description,
        currency: expense.currency,
        method: expense.method,
        tag: expense.tag,
      });
    }
  };

  turnCancelOff = () => {
    const { dispatch, cancel } = this.props;
    if (cancel === true) {
      dispatch(turnOffCancel);
      this.setState({ value: '', description: '' });
    }
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
    const formAdicionar = `d-flex justify-content-between align-items-center bg-dark 
    bg-gradient p-2`;
    const formEditar = `d-flex justify-content-between align-items-center bg-warning 
    bg-gradient p-2 text-dark`;
    const btnAdicionar = 'btn btn-secondary bg-gradient btn-sm';
    const btnEditar = 'btn btn-secondary bg-gradient btn-sm';
    return (
      <form
        className={ editor ? formEditar : formAdicionar }
      >
        <label htmlFor="value-input" className="d-flex align-items-center">
          <strong className="p-2">Valor:</strong>
          <input
            id="value-input"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.localStateHandler }
            className="form-control form-control-sm"
            style={ { width: '80px' } }
          />
        </label>
        <label htmlFor="description-input" className="d-flex align-items-center">
          <strong className="p-2">Descrição: </strong>
          <input
            id="description-input"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.localStateHandler }
            className="form-control form-control-sm"
          />
        </label>
        <label htmlFor="currency-input" className="d-flex align-items-center">
          <strong className="p-2">Moeda:</strong>
          <select
            id="currency-input"
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.localStateHandler }
            className="form-select form-select-sm"
          >
            {currencies.map((name) => <option key={ name }>{name}</option>)}
          </select>
        </label>
        <label htmlFor="method-input" className="d-flex align-items-center">
          <strong className="p-2">Pagamento:</strong>
          <select
            id="method-input"
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.localStateHandler }
            className="form-select form-select-sm"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input" className="d-flex align-items-center">
          <strong className="p-2">Categoria:</strong>
          <select
            id="tag-input"
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.localStateHandler }
            className="form-select form-select-sm"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>

        </label>
        <div style={ { width: '135px' } }>
          <button
            type="button"
            onClick={ this.submitHndl }
            className={ editor ? btnEditar : btnAdicionar }
          >
            {editor === false ? 'Adicionar despesa' : 'Editar despesa'}
          </button>
        </div>
      </form>
    );
  }
}

WalletForm.defaultProps = {
  expenses: [],
  cancel: false,
  storeToForm: false,
};

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  editor: PropTypes.bool.isRequired,
  storeToForm: PropTypes.bool,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
    }),
  ),
  cancel: PropTypes.bool,
};

const mapStateToProps = ({ wallet: { editor, currencies, expenses, storeToForm,
  idToEdit, cancel } }) => ({
  currencies,
  expenses,
  editor,
  storeToForm,
  idToEdit,
  cancel,
});

export default connect(mapStateToProps)(WalletForm);
