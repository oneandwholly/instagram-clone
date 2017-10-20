import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { selectError } from '../selectors';
import { createStructuredSelector } from 'reselect';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Please enter a username';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }
  if (!values.email) {
    errors.email = 'Please enter an email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Please enter a password';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }
  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords must match';
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

const Signup = props => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', height: '100vh'}}>
    <form style={{ width: '80%', padding: '50px 0', display: 'flex', flexDirection: 'column', height: '100%'}} onSubmit={handleSubmit((data) => {
        props.submitSignup(data);
      })}>
      <Field name="username" type="text" component={renderField} label="Username" />
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field name="password" type="password" component={renderField} label="Password" />
      <Field name="passwordConfirm" type="password" component={renderField} label="Confirm Password" />
      <div>
        {renderAlert(props.error)}
        <button style={{ backgroundColor: '#458eff', width: '100%', height: '28px', border: '1px solid', borderRadius: '3px', borderColor: '#458eff', fontFamily: 'Roboto', fontWeight: '700', fontSize: '15px', color: 'white' }} type="submit" disabled={pristine || submitting}>
          Sign Up
        </button>
      </div>
      <div style={{alignSelf: 'center', position: 'absolute', bottom: '50px'}}>
      Have an account? <a style={{ color: '#458eff' }} onClick={props.toggleDisplay}>Log in</a>
      </div>
    </form>
    </div>
  );
};

export default connect(createStructuredSelector({
  error: selectError
}), actions)(reduxForm({
  form: 'signup', // a unique identifier for this form
  validate
})(Signup));