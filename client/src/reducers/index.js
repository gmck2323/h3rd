import { combineReducers } from 'redux';
import { reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import postReducer from './postsReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    posts: postReducer
});