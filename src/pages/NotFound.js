import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <div className="text-center pt-5 fs-1 fw-bold">
        <div className="pt-5 pb-5">Page not found</div>
        <Link to="/" className="text-decoration-none">Voltar à página inicial</Link>
      </div>
    );
  }
}

export default NotFound;
