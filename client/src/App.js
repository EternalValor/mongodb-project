import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Results from './components/Results';
import Home from './components/Home';
import AddPub from './components/AddPub';
import Popup from './components/Popup';
import './App.css';

class App extends Component {

  state = {
    publications: [
      {
        type: -1,
        title: ''
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
    query: {},
    skip: 0,
    limit: 3,
    totalCount: -1,
    popupShown: false,
    popupMessage: 'Title added successfully.'
  }

  search = (query, skip = 0) => { 
    console.log('[SKIPVAL] ', skip)
    
    this.setState({skip});
    console.log('[QUERY] ', query);
    axios.get('/api/publications', {
      params: {...query, skip, limit: this.state.limit}
    })
    .then(pubs => {
      const count = pubs.data.pop();
      console.log(pubs.data);
      this.setState({totalCount: count});
      this.setState({ publications: pubs.data });
      this.countTypes();
    });
  }

  advSearch = (query, skip = 0) => {
    this.setState({skip});
    axios.get('/api/publications/adv', {
      params: {...query, skip, limit: this.state.limit}
    })
      .then(pubs => {
        const count = pubs.data.pop();
        this.setState({totalCount: count});
        this.setState({ publications: pubs.data });
        this.countTypes();
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

  addPublication = (e, pub, push) => {
    e.preventDefault();

    axios.post('/api/publications', {...pub})
      .then(res => {
        console.log('Successfully added ' + res.data.title);
      });
    this.setState({query: {}});
    push('/');
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

  resetQuery = () => {
    this.setState({query: {}});
  }

  setQuery = (query) => {
    this.setState({query});
  }

  pageRight = () => {
    let skip = this.state.skip;
    if(this.state.skip + this.state.limit < this.state.totalCount) {
      skip = this.state.skip + this.state.limit;
    }
    this.setState({skip});
    console.log('[pageRight QUERY] ', this.state.query, this.state.skip);
    this.advSearch(this.state.query, skip);
  }

  pageLeft = () => {
    let skip = this.state.skip;
    if(this.state.skip - this.state.limit >= 0) {
      skip = this.state.skip - this.state.limit;
    }
    this.setState({skip});
    console.log('[pageRight QUERY] ', this.state.query, this.state.skip);
    this.advSearch(this.state.query, skip);
  }

  showPopup = (message, del) => {
    if(del) {
      this.setState({popupMessage: message, popupShown: true, popupRed: true});
    } else {
      this.setState({popupMessage: message, popupShown: true, popupRed: false});
    }
    setTimeout(() => {
      this.setState({popupShown: false})
    }, 3000);
  }

  render() {
    return (
      <div className="App">   
        <Popup 
          shown={this.state.popupShown}
          message={this.state.popupMessage}
          popupRed={this.state.popupRed} />
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
                                  advSearch={this.advSearch}
                                  onSearchChange={this.onSearchChange}
                                  query={this.state.query}
                                  resetQuery={this.resetQuery}
                                  setQuery={this.setQuery} />} />
            <Route 
              path="/results"
              render={props => <Results {...props}
                                  publications={this.state.publications} 
                                  delete={this.delete}
                                  updateHandler={this.update}
                                  types={this.state.types}
                                  typesCount={this.state.typesCount}
                                  search={this.search}
                                  advSearch={this.advSearch}
                                  onSearchChange={this.onSearchChange}
                                  query={this.state.query}
                                  resetQuery={this.resetQuery}
                                  setQuery={this.setQuery}
                                  totalCount={this.state.totalCount}
                                  from={this.state.skip + 1}
                                  to={this.state.skip + this.state.publications.length}
                                  pageRight={this.pageRight}
                                  pageLeft={this.pageLeft}
                                  showPopup={this.showPopup} />}  />
            <Route 
              path="/add-publication"
              render={props => <AddPub {...props}
                                        search={this.search}
                                        advSearch={this.advSearch}
                                        query={this.state.query}
                                        onSearchChange={this.onSearchChange}
                                        addPublication={this.addPublication}
                                        resetQuery={this.resetQuery}
                                        setQuery={this.setQuery}
                                        showPopup={this.showPopup} />} />
          </Switch>
        </Router>
      </div>

    );
  }
}

export default App;
