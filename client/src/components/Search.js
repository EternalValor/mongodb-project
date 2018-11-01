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
        <form className="form" onSubmit={(e) => this.props.search(e, this.state.name)}>
  
          <input className="search" type="text" placeholder="Search" name="name" onChange={this.onChange} />
          <button className="search-btn" >Search</button>
        </form>

        <div>
          {this.props.publications[0].authors}
        </div>
      </div>
    );
  }
}

export default Search;