import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <div className="fixed-top">
          <Header />
          <WalletForm />
        </div>
        <br />
        <div
          style={ { margin: '100px 0 0 0' } }
        >
          <Table />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

export default connect(mapStateToProps)(Wallet);
