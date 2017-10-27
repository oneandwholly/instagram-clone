import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { selectError } from '../selectors';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Please enter a username';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }
  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) =>
  <div style={{ height: '50px' }} >
    <div style={{display: 'flex', flexDirection: 'column'}} >
      <input style={{ backgroundColor: '#f9f9f9', border:'1px solid #eee', height: '30px', borderRadius: '3px' }} {...input} placeholder={label} type={type} />
      {touched && ((error && <span style={{ color:'#ff5e5e' }}>{error}</span>))}
    </div>
  </div>

const renderAlert = (error) => {
  if (error) {
    return <div className="alert alert-danger">
      <strong>Oops!</strong> {error}
    </div>
  }
}

const Login = props => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', height: '100vh' }} className={props.className}>
    <form style={{ width: '80%', padding: '50px 0', display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit(props.submitLogin)}>
      <Field name="username" type="text" component={renderField} label="Username" />
      <Field name="password" type="password" component={renderField} label="Password" />
      <div>
        {renderAlert(props.error)}
        <button style={{ backgroundColor: '#458eff', width: '100%', height: '28px', border: '1px solid', borderRadius: '3px', borderColor: '#458eff', fontFamily: 'Roboto', fontWeight: '700', fontSize: '15px', color: 'white' }} type="submit" disabled={pristine || submitting}>
          Log In
        </button>
      </div>
      <div style={{alignSelf: 'center', position: 'absolute', bottom: '50px'}}>
      {"Don't have an account?"} <a style={{ color: '#458eff' }} onClick={props.toggleDisplay}>Sign up</a>
      </div>
    </form>
    </div>
  );
};

const StyledLogin = styled(Login)`
max-width: 600px;

@media (min-width: 600px) { 
    margin : 60px auto;
    border: 1px solid #eee;
    border-radius: 3px;
}
`;

export default connect(createStructuredSelector({
  error: selectError
}), actions)(reduxForm({
  form: 'login', // a unique identifier for this form
  validate
})(StyledLogin));