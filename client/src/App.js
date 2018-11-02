import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Results from './components/Results';
import Home from './components/Home';
import './App.css';

class App extends Component {

  state = {
    publications: [
      {
        type: 1,
        title: 'Hello World'
      }
    ],
    types: {
      1: "Publications parues dans des revues internationales indexées",
      2: "Publications parues dans des revues internationales à comité de lecture",
      3: "Publications parues dans des revues nationales à comité de lecture",
      4: "Ouvrages de recherche avec ISBN",
      5: "Chapitres d’ouvrage indexés dans des bases de données internationales",
      6: "Publications dans des actes de congrès scientifiques",
      7: "Communications orales et posters dans des congrès scientifiques",
      8: "Brevets d’invention déposés",
      9: "Thèses de doctorat soutenues et encadrées par un membre de la structure",
      10: "Projets financés",
      11: "Conventions signées "
    },
    typesCount: [],
    query: {}
  }

  search = (e, query, push) => { 
    e.preventDefault();

    axios.get('/api/publications', {
      params: query
    })
    .then(pubs => {
      console.log(pubs.data);
      console.log(query)
      // if(pubs.data.length) {
        this.setState({ publications: pubs.data });
        this.countTypes();
      // }
    });
    push('/results');
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

  countTypes = () => {
    this.setState({typesCount: []});
    this.state.publications.forEach(pub => {
      let newTypesCount = [...this.state.typesCount];
      if(newTypesCount[pub.type]) newTypesCount[parseInt(pub.type)]++;
      else newTypesCount[pub.type] = 1;
      this.setState({
        typesCount: newTypesCount
      })
    })
  }

  aggregateTypesCount = () => {
    axios.get('/api/publications/count')
      .then(res => {
        let newTypesCount = [];
        res.data.forEach(count => {
          newTypesCount[count._id] = count.count;
        });
        this.setState({typesCount: newTypesCount});
      })
  }

  onSearchChange = (e) => {
    let query = { ...this.state.query };
    if(e.target.type === "number") {
      if(e.target.name === 'begin' || e.target.name === 'end') {
        query.pages[e.target.name] = parseInt(e.target.value);
      }  else query[e.target.name] = parseInt(e.target.value);

    } else if(typeof query[e.target.name] == typeof []) {
      let newArr = e.target.value.split(", ");
      query[e.target.name] = newArr;

    } else if(e.target.name === 'IF') {
      if(e.target.value === '' || e.target.value === '0.0') {
        query.IF = 0.0;
        e.target.value = '0.01';
      } else query.IF = parseFloat(e.target.value);

    } else query[e.target.name] = e.target.value;
    this.setState({query});
    console.log(query);
  }

  render() {
    return (
      <div className="App">   
        {/* <Search search={this.search} publications={this.state.publications} /> */}
        <Router>

          <Switch>
            <Route 
              path="/"
              exact
              render={props => <Home {...props}
                                  types={this.state.types}
                                  typesCount={this.state.typesCount}
                                  aggregate={this.aggregateTypesCount}
                                  search={this.search}
                                  onSearchChange={this.onSearchChange}
                                  query={this.state.query} />} />
            <Route 
              path="/results"
              render={props => <Results {...props}
                                  publications={this.state.publications} 
                                  delete={this.delete}
                                  updateHandler={this.update}
                                  types={this.state.types}
                                  typesCount={this.state.typesCount}
                                  search={this.search}
                                  onSearchChange={this.onSearchChange}
                                  query={this.state.query} />}  />
          </Switch>
        </Router>
      </div>

    );
  }
}

export default App;
