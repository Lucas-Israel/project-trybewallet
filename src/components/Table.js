import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenseByID, editExpenseByID, cancelar } from '../redux/actions/index';

class Table extends Component {
  randomNum = () => {
    const multiplicadorDoRandom = 1000000;

    return (Math.random() * multiplicadorDoRandom).toFixed(0);
  };

  render() {
    const { expenses, dispatch, editor, idToEdit } = this.props;
    const tableHead = 'text-center align-middle';
    const tableRow = 'text-center align-middle';
    const tableRowDesc = `${tableRow} text-break`;
    const btnEdit = 'btn btn-sm btn-warning align-middle';
    const btnDel = 'btn btn-sm btn-danger align-middle';
    return (
      <table
        className="table table-striped table-bordered table-dark table-hover"
        style={ { width: '100%' } }
      >
        <thead>
          <tr>
            <th className={ tableHead } scope="col">Valor</th>
            <th
              className={ tableHead }
              scope="col"
              style={ { maxWidth: '250px', width: '250px' } }
            >
              Descrição

            </th>
            <th className={ tableHead } scope="col">Moeda</th>
            <th className={ tableHead } scope="col">Método de pagamento</th>
            <th className={ tableHead } scope="col">Tag</th>
            <th className={ tableHead } scope="col">Câmbio utilizado</th>
            <th className={ tableHead } scope="col">Valor convertido</th>
            <th className={ tableHead } scope="col">Moeda de conversão</th>
            <th className={ tableHead } scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.length > 0 && expenses
            .map(({ id, currency, description, method, tag, value, exchangeRates }) => (
              <tr key={ id + this.randomNum() }>
                <td className={ tableRow }>{(+value).toFixed(2)}</td>
                <td className={ tableRowDesc }>{description}</td>
                <td className={ tableRow }>{exchangeRates[currency].name}</td>
                <td className={ tableRow }>{method}</td>
                <td className={ tableRow }>{tag}</td>
                <td className={ tableRow }>{exchangeRates[currency].name}</td>
                <td className={ tableRow }>
                  {+value === 0 ? '0.00' : +value}
                  {' * '}
                  {(+exchangeRates[currency].ask).toFixed(2)}
                  {' = '}
                  {((+value) * (+exchangeRates[currency].ask)).toFixed(2)}
                </td>
                <td className={ tableRow }>Real</td>
                <td className={ tableRow } style={ { width: '170px' } }>
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className={ btnEdit }
                      data-testid="edit-btn"
                      onClick={ editor
                        ? () => dispatch(cancelar)
                        : () => dispatch(editExpenseByID(id)) }
                      disabled={ editor && idToEdit !== id }
                      style={ { width: '76px' } }
                    >
                      { editor && idToEdit === id ? 'Cancelar' : 'Editar'}
                    </button>
                    <button
                      type="button"
                      className={ btnDel }
                      data-testid="delete-btn"
                      onClick={ () => dispatch(removeExpenseByID(id)) }
                      disabled={ editor }
                    >
                      Deletar
                    </button>
                  </div>
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
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = ({ wallet: { expenses, editor, idToEdit } }) => ({
  expenses,
  editor,
  idToEdit,
});

export default connect(mapStateToProps)(Table);
