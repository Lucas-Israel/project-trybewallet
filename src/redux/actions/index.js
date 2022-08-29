export const ENVIAR = 'ENVIAREMAIL';
export const REQUEST_API = 'REQUEST_API';
export const GET_COIN = 'GET_COIN';
export const EXCHANGE_RATES_SUBMIT = 'EXCHANGE_RATES_SUBMIT';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDITED_TO_STORE = 'EDITED_TO_STORE';

const fetchURL = 'https://economia.awesomeapi.com.br/json/all';

export const sendEmail = (payload) => ({ type: ENVIAR, payload });

const requestAPI = () => ({ type: REQUEST_API });

const getCoin = (payload) => ({ type: GET_COIN, payload });

const errorToConsole = (message) => console.log(message);

export const fetchAPI = () => async (dispatch) => {
  try {
    dispatch(requestAPI());
    const response = await fetch(fetchURL);
    const json = await response.json();
    await dispatch(getCoin(json));
  } catch (error) {
    errorToConsole(error);
  }
};

export const walletformsubmit = (state) => async (dispatch) => {
  try {
    const response = await fetch(fetchURL);
    const json = await response.json();
    delete json.USDT;
    await dispatch({
      type: EXCHANGE_RATES_SUBMIT,
      payload: {
        ...state,
        exchangeRates: json,
      },
    });
  } catch (error) {
    errorToConsole(error);
  }
};

export const removeExpenseByID = (payload) => ({ type: REMOVE_EXPENSE, payload });

export const editExpenseByID = (payload) => ({ type: EDIT_EXPENSE, payload });

// export const editedExpenseToStore = (payload) => ({ type: EDITED_TO_STORE, payload });

export const editedExpenseToStore = (state) => async (dispatch) => {
  try {
    const response = await fetch(fetchURL);
    const json = await response.json();
    delete json.USDT;
    await dispatch({
      type: EDITED_TO_STORE,
      payload: {
        ...state,
        exchangeRates: json,
      },
    });
  } catch (error) {
    errorToConsole(error);
  }
};
