import React from 'react';
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
      <div>
        <form className="form" onSubmit={(e) => this.props.search(e, this.props.query, this.props.history.push)}>
          <input className="search" type="text" placeholder="Search" name="title" onChange={this.props.onSearchChange} />
          <button className="search-btn" >Search</button>
        </form>
      </div>
    );
  }
}

export default Search;