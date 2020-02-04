import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import parse from 'html-react-parser';

const PostFormReview = ({ onCancel, formValues, submitPost, history }) => {
    const reviewFields = _.map(formFields, ({name, label}) =>{
        return (
            <div key={name}>
            <label>{label}</label>
            <div>
                {formValues[name]}
            </div>
            </div>
        );
    });

    return(
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <div key= "body">
                <label>Post</label>
                <div>{parse(formValues["body"])}</div>
            </div>
            <button
            className="yellow darken-3 white-text btn-flat"
            onClick={onCancel}>
            Back
            </button>
            <button 
            onClick={() => submitPost(formValues, history)}
            className="green btn-flat right white-text">
                Submit Post
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state){
    return { formValues: state.form.postForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(PostFormReview));
