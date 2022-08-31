import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendEmail } from '../redux/actions/index';
import trybeIcon from '../images/trybeIcon.png';

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

      <form
        className="d-flex flex-column p-2 w-25
        mw-30 mx-auto mt-5 border border-color-light rounded bg-gradient"
        style={ { backgroundColor: 'rgb(210,210,210, 0.5)' } }
      >
        <div className="d-flex justify-content-center">
          <img
            src={ trybeIcon }
            alt="trybe icon"
            className="img-fluid"
            style={ { width: '40%', margin: '0 0 0 32px' } }
          />
        </div>
        <div className="form-group d-flex flex-column input-group form-group mt-3">
          <label htmlFor="emailInput" className="input-group form-group">
            <span className="input-group-text">
              <i className="fas fa-user" />
            </span>
            <input
              id="emailInput"
              name="emailInput"
              type="email"
              data-testid="email-input"
              value={ emailInput }
              onChange={ this.localStateHandler }
              required
              className="form-control"
              placeholder="Digite seu email"
            />
          </label>
          <label htmlFor="passwordInput" className="input-group form-group mt-3">
            <span className="input-group-text">
              <i className="fas fa-key" />
            </span>
            <input
              id="passwordInput"
              name="passwordInput"
              type="password"
              data-testid="password-input"
              value={ passwordInput }
              onChange={ this.localStateHandler }
              className="form-control"
              placeholder="Digite sua senha"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={ this.submitHandler }
          disabled={ !isDisabled }
          className="btn btn-secondary btn-sm mt-3 mx-auto mb-2"
          style={ { width: '100px' } }
        >
          Entrar

        </button>
      </form>
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
