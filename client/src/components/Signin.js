import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Search from './Search';
import '../css/Signin.css';

class Signin extends React.Component {
  state = {
    username: '',
    password: '',
    errMessage: '',
    redirectTo: '/signin'
  };

  onChange = e => {
    console.log('[' + e.target.name + ']', e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    axios
      .post('/signin', {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
        const data = res.data;
        if (!data.token) {
          this.setState({ errMessage: data.message });
        } else {
          let storage = window.localStorage;
          storage.setItem('token', data.token);
          this.props.toggleLoggedIn(data.username);
          this.setState({ redirectTo: '/' });
        }
      });

    console.log(this.state);
  };

  render() {
    if (this.state.redirectTo !== '/signin') {
      return <Redirect to={`${this.state.redirectTo}`} />;
    } else {
      return (
        <div>
          <Search {...this.props} search={this.props.search} />
          <form onSubmit={this.onSubmit} className="sign-form">
            <h1 className="sign-heading">Sign In</h1>
            <label htmlFor="username" className="sign-label">
              Username:{' '}
            </label>
            <input
              type="text"
              name="username"
              className="sign-input"
              value={this.state.username}
              onChange={this.onChange}
              required
            />
            <br />

            <label htmlFor="password" className="sign-label">
              Password:{' '}
            </label>
            <input
              type="password"
              name="password"
              className="sign-input"
              value={this.state.password}
              onChange={this.onChange}
              required
            />
            <br />
            <button className="sign-form-btn">Sign In</button>
            {this.state.errMessage !== '' ? (
              <div style={{ color: 'red' }}>{this.state.errMessage}</div>
            ) : null}
            <div className="sign-text">
              Don't have an account? Create one{' '}
              <Link className="sign-link" to="/signup">
                here
              </Link>
              .
            </div>
          </form>
        </div>
      );
    } // End of if statement for returns
  } // End of Render
} // End of Class

export default Signin;
