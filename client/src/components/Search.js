import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Search.css';

class Search extends React.Component {

  state = {
    name: '',
    advSearch: false,
    types: {
      1: {
        name: "Publications parues dans des revues internationales indexées",
        fields: {
          authors: "text",
          journal: "text",
          year: "number"
        }
      },
      2: {
        name: "Publications parues dans des revues internationales à comité de lecture",
        fields: {
          authors: "text",
          journal: "text",
          year: "number"
        }
      },
      3: {
        name: "Publications parues dans des revues nationales à comité de lecture",
        fields: {
          authors: "text",
          journal: "text",
          year: "number",
        }
      },
      4: {
        name: "Ouvrages de recherche avec ISBN",
        fields: {
          authors: "text",
          publisher: "text",
          location: "text",
          year: "number",
          ISBN: "text"
        }
      },
      5: {
        name: "Chapitres d’ouvrage indexés dans des bases de données internationales",
        fields: {
          chapTitle: "text",
          authors: "text",
          publisher: "text",
          year: "number"
        }
      },
      6: {
        name: "Publications dans des actes de congrès scientifiques",
        fields: {
          authors: "text",
          meetingName: "text",
          location: "text",
          date: "text"
        }
      },
      7: {
        name: "Communications orales et posters dans des congrès scientifiques",
        fields: {
          authors: "text",
          meetingName: "text",
          location: "text",
          date: "text"
        }
      },
      8: {
        name: "Brevets d’invention déposés",
        fields: {
          authors: "text",
          references: "text",
          year: "number",
          country: "text"
        }
      },
      9: {
        name: "Thèses de doctorat soutenues et encadrées par un membre de la structure",
        fields: {
          authors: "text",
          advisor: "text",
          jury: "text",
          date: "text"
        }
      },
      10: {
        name: "Projets financés",
        fields: {
          responsable: "text",
          domicil: "text",
          fundingOrganisation: "text",
          endowment: "number"
        }
      },
      11: {
        name: "Conventions signées",
        fields: {
          institutions: "text",
          coordinator: "text",
          funding: "number"
        }
      }
    },
    selectedType: -1,
    isArray: ["authors", "references", "jury", "institutions"]
  }
  
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  toggleAdvSearch = () => {
    this.setState({advSearch: !this.state.advSearch});
  }

  onSelectClick = (e) => {
    this.setState({selectedType: e.target.value, advQuery: {}});
  }

  onChange = e => {
    let newQuery = {...this.state.advQuery};
    if(this.state.isArray.indexOf(e.target.name) === -1){
      if(e.target.type === 'number'){

        if(e.target.name.includes(' from') || e.target.name.includes(' to')) {
          newQuery[e.target.name] = parseInt(e.target.value);
        } else newQuery[e.target.name] = parseFloat(e.target.value);

      }else newQuery[e.target.name] = e.target.value;
    }
    else newQuery[e.target.name] = e.target.value.split(", ");
    this.setState({
      advQuery: newQuery
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.history.push('/results');
    this.props.setQuery({...this.state.advQuery, type: parseInt(this.state.selectedType)});
    this.props.advSearch({...this.state.advQuery, type: parseInt(this.state.selectedType)});
    this.toggleAdvSearch();
    this.setState({selectedType: -1});
  }

  render() {
    const searchContainerClass = this.state.advSearch ? 'search-container search-container--hidden' : 'search-container';
    const advSearchBtnClass = this.state.advSearch ? 'adv-search-btn adv-search-btn--hidden' : 'adv-search-btn';
    const advSearchFormClass = this.state.advSearch ? 'adv-search-form' : 'adv-search-form--hidden';
    const advSearchContainerClass = this.state.advSearch ? 'adv-search-container adv-search-container--shown' : 'adv-search-container';
    return (
      <div 
        className="header">
        <div className={searchContainerClass}>
          <div 
            className="logo"
            onClick={e => {
              this.props.history.push('/');
              this.props.resetQuery();
            }}>
            <svg 
              className="leaf-icon"
              style={{"width":'24px', "height":'24px'}} 
              viewBox="0 0 24 24">
              <path fill="#139E47" d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>&nbsp;
              MongoProject<br/><span className="logo-subtext">BD Avancee - UCD</span>
          </div>
          <form className="form" onSubmit={(e) => {
              e.preventDefault();
              this.props.history.push('/results');
              const query = this.props.query;
              delete query.type;
              this.props.search(query); 
            }}>
            <input className="search" type="text" placeholder="Search" name="title" onChange={this.props.onSearchChange} />
            <button className="search-btn" >Search</button>
          </form>
          <Link 
            className="add-btn"
            to="/add-publication" >+ Add</Link>
        </div>
          <div className={advSearchContainerClass}>
            <div className={advSearchBtnClass}><span onClick={this.toggleAdvSearch} style={{'cursor': 'pointer'}}>Advanced Search</span></div>
            
            <form className={advSearchFormClass} onSubmit={this.onSubmit}>
              <h1 className="adv-search-heading">Advanced Search</h1>
              <select className="adv-type-select" onClick={this.onSelectClick} defaultValue="">
                <option value="" disabled>Select Publication Type</option>
                {
                  Object.keys(this.state.types).map((type, index) => 
                    <option key={index} value={type} className="type-select__option">
                      {this.state.types[type].name}
                    </option>
                  )
                }
              </select>
              {
                this.state.selectedType > 0 ?
                  Object.keys(this.state.types[`${this.state.selectedType}`].fields).map((field, index) => 
                    <div key={index} >
                      <span className="adv-input-title">{field === 'fundingOrganisation' ? 'Organisation' : field}: </span>
                      {
                        this.state.types[`${this.state.selectedType}`].fields[field] !== 'number' ? 
                          this.state.isArray.indexOf(field) === -1 ?
                          <input 
                            type={this.state.types[`${this.state.selectedType}`].fields[field]}
                            name={field}
                            value={
                              this.state.advQuery[field] ? 
                                this.state.isArray.indexOf(field) === -1 ?
                                `${this.state.advQuery[field]}` 
                                : this.state.advQuery[field].join(", ")
                              : ''
                            }
                            onChange={this.onChange}
                            className="adv-input" />
                            : <span className="adv-input-array">
                                <input 
                                  type={this.state.types[`${this.state.selectedType}`].fields[field]}
                                  name={field}
                                  value={
                                    this.state.advQuery[field] ? 
                                      this.state.isArray.indexOf(field) === -1 ?
                                      `${this.state.advQuery[field]}` 
                                      : this.state.advQuery[field].join(", ")
                                    : ''
                                  }
                                  onChange={this.onChange}
                                  className="adv-input" />
                              </span>
                        : <span>
                            <span className="adv-number-title">From: </span>
                                    <input
                                      type="number"
                                      name={`${field} from`}
                                      value={this.state.advQuery[`${field} from`] ? this.state.advQuery[`${field} from`] : ''}
                                      onChange={this.onChange}
                                      className="adv-number-input"
                                       /> 
                            &nbsp;&nbsp;
                            <span className="adv-number-title">To: </span>
                                  <input
                                    type="number"
                                    name={`${field} to`}
                                    value={this.state.advQuery[`${field} to`] ? this.state.advQuery[`${field} to`] : ''}
                                    onChange={this.onChange}
                                    className="adv-number-input"
                                     /> 
                          </span>
                      }
                      
                    </div>
                  )
                : null
              }
              <div className="adv-form-btn adv-form-btn--orange" onClick={this.toggleAdvSearch}>Cancel</div>
              <button className="adv-form-btn">Search</button>
            </form>
          </div>
      </div>
    );
  }
}

export default Search;