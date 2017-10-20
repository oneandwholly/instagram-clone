import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import nav from '../../nav';
import photos from '../../photos';
import styled from 'styled-components';
import plus_icon from '../../../assets/icons/plus.png';
import core from '../../core';

const FILE_FIELD_NAME = 'files';

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        style={{ border: '1px solid #eee', width: '100%', height: '300px', display: 'flex', justifyContent: 'center'}}
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}><StyledUploadImage src={plus_icon} /></div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false, caption: '' };
    }

    componentWillMount() {
        this.props.setActive('create')
    }
  setRedirectToTrue() {
    this.setState({ redirect: true });
  }

  onSubmit(data) {
    this.props.postPhotos({ ...data, user_id: this.props.authUserId }, this.setRedirectToTrue.bind(this));
  }

  render() {
    const {
      handleSubmit
    } = this.props;
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <Field
            name={FILE_FIELD_NAME}
            component={renderDropzoneInput}
          />
          <label></label>
          <StyledField name="caption" component="textarea" type="text" />
        </div>
        <div>
          
          <button type="submit" style={{width: '100%', border: 'none', backgroundColor: 'white'}}>
            <core.components.ListItem>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
            <div>Submit</div>
            </div>
            </core.components.ListItem>
          </button>
        </div>
      </form>
    );
  }
}

const StyledUploadImage = styled.img`
  width: 80px;
`;

const StyledField = styled(Field)`
  width: 100%;
  height: 100px;
  color: blue;
  resize: none;
  border: 1px solid #eee;
  border-right: none;
  border-left: none;
`;

const form = reduxForm({
  form: 'simple',
})(Create);

export default connect((state) => ({authUserId: state.auth.userId}), {postPhotos: photos.actions.postPhotos, setActive: nav.actions.setActive})(form);
