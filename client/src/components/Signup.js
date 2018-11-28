import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Search from './Search';

class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    redirectTo: '/signup',
    errMessage: ''
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
      .post('/signup', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        const data = res.data;
        if (data.valid) {
          this.props.toggleLoggedIn(data.username);
          window.localStorage.setItem('token', data.token);
          this.setState({ redirectTo: '/' });
        } else {
          this.setState({ errMessage: data.message });
        }
        console.log(res);
      });

    console.log(this.state);
  };

  render() {
    if (this.state.redirectTo !== '/signup') {
      return <Redirect to={`${this.state.redirectTo}`} />;
    } else {
      return (
        <div>
          <Search {...this.props} search={this.props.search} />
          <form onSubmit={this.onSubmit} className="sign-form">
            <h1 className="sign-heading">Sign Up</h1>
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
            <label htmlFor="email" className="sign-label">
              Email:{' '}
            </label>
            <input
              type="email"
              name="email"
              className="sign-input"
              value={this.state.email}
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
            <button className="sign-form-btn">Sign Up</button>
            {this.state.errMessage !== '' ? (
              <div style={{ color: 'red' }}>{this.state.errMessage}</div>
            ) : null}
            <div className="sign-text">
              Already have an account? Sign in{' '}
              <Link className="sign-link" to="/signin">
                here
              </Link>
              .
            </div>
          </form>
        </div>
      ); // End of return
    }
  } // End of Render
} // End of Class

export default Signup;
