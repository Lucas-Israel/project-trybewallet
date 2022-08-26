import { ENVIAR } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ENVIAR:
    return { ...state, email: payload };
  default:
    return state;
  }
};

export default user;
