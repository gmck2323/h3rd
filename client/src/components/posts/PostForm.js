import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import PostField from './PostField';
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields';
import TextEditor from './TextEditor';



class PostForm extends Component{
    constructor() {
        super()
        this.state = {content: ''}
    }
    
    
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return(<Field key={name} component={PostField} type="text" label={label} name={name}/>
            );
        });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.props.handleSubmit(this.props.onPostSubmit)}>
                {this.renderFields()}
                <Field component={TextEditor} label="Body" name="body" key="body"/>
                <Link to="/posts" className="red btn-flat white-text">
                Cancel
                </Link>
                <button type="submit" className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
                </button>
                </form>
            </div>
            
        );
    }
}

function validate(values) {
    const errors= {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value'
        }
    });

    

    return errors;
}

export default reduxForm({
    validate,
    form: 'postForm',
    destroyOnUnmount: false
})(PostForm);