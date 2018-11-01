import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Search from './components/Search';
import Results from './components/Results';

class App extends Component {

  state = {
    publications: [
      {
        title: 'Hello World'
      }
    ]
  }

  search = (e, title) => { 
    e.preventDefault();

    axios.get('/api/publications', {
      params: {
        title: title
      }
    })
    .then(pubs => {
      console.log(pubs.data);
      if(pubs.data.length) this.setState({ publications: pubs.data });
    })
  }

  delete = (id) => {
    axios.delete(`/api/publications/${id}`)
      .then(res => {
          let newPubsState = this.state.publications.filter(pub => pub._id !== id);
          console.log(newPubsState);
          this.setState({publications: newPubsState});
      })
      .catch(err => console.log(err));
  }

  update = (e, id, updatedPub) => {
    e.preventDefault();

    axios.put(`/api/publications/${id}`, {...updatedPub})
      .then(res => {
        let newPubsState = this.state.publications.map(pub => pub._id === id ? updatedPub : pub )
        this.setState({publications: newPubsState});
      })
  }

  render() {
    return (
      <div className="App">
        <Search search={this.search} publications={this.state.publications} />
        <Results 
          publications={this.state.publications} 
          delete={this.delete}
          updateHandler={this.update} />
      </div>
    );
  }
}

export default App;
