import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
import logo from '../images/logo_transparent.png';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default:
                return [
                <li key="1"><Payments/></li>,
                <li key = "3" style={{margin: 
                '0 10px'}}>
                    <a href="/posts">Posts</a>
                </li>,
                <li key="2"><a href="/api/logout">Logout</a></li>
            ];
        }
    }
    render() {
        return(
            <div>
            <nav>
            <div className="nav-wrapper light-blue darken-3">
              <Link 
              to={this.props.auth ? '/posts' : '/'} 
              className="left brand-logo"
              >
              <img src={logo} alt="h3rd logo" style={{height:"75px"}}/>
              </Link>
              <Link to='/' className='brand-logo center white-text'>H3rd</Link>
              <ul className="right">
                {this.renderContent()}
              </ul>
            </div>
          </nav>
          </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);