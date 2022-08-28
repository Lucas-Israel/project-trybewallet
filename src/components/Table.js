import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
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
            <th>Total convertido</th>
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
                <td>{(+exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{((+value) * (+exchangeRates[currency].ask)).toFixed(2)}</td>
                <td>Real</td>
                <td><button type="button">del</button></td>
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
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(Table);
