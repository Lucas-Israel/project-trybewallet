import {
  REQUEST_API,
  GET_COIN,
  EXCHANGE_RATES_SUBMIT,
  REMOVE_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  loading: false,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_API:
    return {
      ...state,
      loading: true,
    };
  case GET_COIN:
    return {
      ...state,
      currencies: Object.keys(payload).filter((name) => name !== 'USDT'),
      loading: false,
    };
  case EXCHANGE_RATES_SUBMIT:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        payload,
      ],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter(({ id }) => id !== payload),
      ],
    };
  default:
    return state;
  }
};

export default wallet;
