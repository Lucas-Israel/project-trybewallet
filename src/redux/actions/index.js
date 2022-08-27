export const ENVIAR = 'ENVIAREMAIL';
export const REQUEST_API = 'REQUEST_API';
export const GET_COIN = 'GET_COIN';
export const WALLETFORM_SUBMIT = 'WALLETFORM_SUBMIT';

export const sendEmail = (payload) => ({ type: ENVIAR, payload });

export const requestAPI = () => ({ type: REQUEST_API });

export const getCoin = (payload) => ({ type: GET_COIN, payload });

export const fetchAPI = () => async (dispatch) => {
  dispatch(requestAPI());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  return dispatch(getCoin(json));
};

export const walletformsubmit = (payload) => ({ type: WALLETFORM_SUBMIT, payload });
