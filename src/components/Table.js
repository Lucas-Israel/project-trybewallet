import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenseByID, editExpenseByID } from '../redux/actions/index';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table style={ { width: '100%' } }>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Moeda</th>
            <th>Método de pagamento</th>
            <th>Tag</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.length > 0 && expenses
            .map(({ id, currency, description, method, tag, value, exchangeRates }) => (
              <tr key={ id }>
                <td>{(+value).toFixed(2)}</td>
                <td>{description}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{method}</td>
                <td>{tag}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>
                  {value}
                  {' * '}
                  {(+exchangeRates[currency].ask).toFixed(2)}
                  {' = '}
                  {((+value) * (+exchangeRates[currency].ask)).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => dispatch(editExpenseByID(id)) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => dispatch(removeExpenseByID(id)) }
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            )) }
        </tbody>
      </table>
    );
  }
}

Table.defaultProps = {
  expenses: [],
};

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(Table);
