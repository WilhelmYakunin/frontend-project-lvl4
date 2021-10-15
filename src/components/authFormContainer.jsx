import React from 'react';

const AuthFormContainer = ({ children }) => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow">
          <div className="card-body row p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AuthFormContainer;
