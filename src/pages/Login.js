import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendEmail } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    emailInput: '',
    passwordInput: '',
  };

  localStateHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { toStore, history } = this.props;
    const { emailInput } = this.state;
    toStore(emailInput);
    history.push('/carteira');
  };

  render() {
    const { emailInput, passwordInput } = this.state;
    const pwLengthReq = 6;
    const isDisabled = passwordInput.length >= pwLengthReq && emailInput.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    return (
      <div>
        TrybeWallet login
        <form>
          <label htmlFor="emailInput">
            Email:
            {' '}
            <input
              id="emailInput"
              name="emailInput"
              type="email"
              data-testid="email-input"
              value={ emailInput }
              onChange={ this.localStateHandler }
              required
            />
          </label>
          <label htmlFor="passwordInput">
            Senha:
            {' '}
            <input
              id="passwordInput"
              name="passwordInput"
              type="password"
              data-testid="password-input"
              value={ passwordInput }
              onChange={ this.localStateHandler }
            />
          </label>
          <button
            type="button"
            onClick={ this.submitHandler }
            disabled={ !isDisabled }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  toStore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  toStore: (state) => dispatch(sendEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);
