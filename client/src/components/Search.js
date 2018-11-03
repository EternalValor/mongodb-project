import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Search.css';

class Search extends React.Component {

  state = {
    name: ''
  }
  
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log('[NAME]', this.state.name);
  }

  render() {

    return (
      <div 
        className="header">
        <div 
          className="logo"
          onClick={e => this.props.history.push('/')}>
          <svg 
            className="leaf-icon"
            style={{"width":'24px', "height":'24px'}} 
            viewBox="0 0 24 24">
            <path fill="#139E47" d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
          </svg>&nbsp;
            MongoProject<br/><span className="logo-subtext">BD Avancee - UCD</span>
        </div>
        <form className="form" onSubmit={(e) => {this.props.search(e, this.props.query, this.props.history.push); console.log('[SEARCH QUERY] ', this.props.query)}}>
          <input className="search" type="text" placeholder="Search" name="title" onChange={this.props.onSearchChange} />
          <button className="search-btn" >Search</button>
        </form>
        <Link 
          className="add-btn"
          to="/add-publication" >+ Add</Link>
      </div>
    );
  }
}

export default Search;