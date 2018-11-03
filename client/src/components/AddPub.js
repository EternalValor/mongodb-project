import React from 'react';
import Search from './Search';


class AddPub extends React.Component {
  state = {
    types: {
      1: {
        name: "Publications parues dans des revues internationales indexées",
        fields: {
          authors: "text",
          journal: "text",
          volume: "number",
          issue: "number",
          pages: {
            begin: "number",
            end: "number"
          },
          year: "number",
          IF: "text",
          url: "text"
        }
      },
      2: {
        name: "Publications parues dans des revues internationales à comité de lecture",
        fields: {
          authors: "text",
          journal: "text",
          volume: "number",
          issue: "number",
          pages: {
            begin: "number",
            end: "number"
          },
          year: "number",
          url: "text"
        }
      },
      3: {
        name: "Publications parues dans des revues nationales à comité de lecture",
        fields: {
          authors: "text",
          journal: "text",
          volume: "number",
          issue: "number",
          pages: {
            begin: "number",
            end: "number"
          },
          year: "number",
          url: "text"
        }
      },
      4: {
        name: "Ouvrages de recherche avec ISBN",
        fields: {
          authors: "text",
          publisher: "text",
          location: "text",
          year: "number",
          ISBN: "text",
          legalDepo: "text"
        }
      },
      5: {
        name: "Chapitres d’ouvrage indexés dans des bases de données internationales",
        fields: {
          chapTitle: "text",
          authors: "text",
          publisher: "text",
          year: "number",
          url: "text"
        }
      },
      6: {
        name: "Publications dans des actes de congrès scientifiques",
        fields: {
          authors: "text",
          mettingName: "text",
          location: "text",
          date: "text",
          url: "text"
        }
      },
      7: {
        name: "Communications orales et posters dans des congrès scientifiques",
        fields: {
          authors: "text",
          meetingName: "text",
          commType: "text",
          location: "text",
          date: "text",
          url: "text"
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
          dat: "text"
        }
      },
      10: {
        name: "Projets financés",
        fields: {
          responsable: "text",
          domicil: "text",
          fundingOrganisation: "text",
          length: "text",
          endowment: "number"
        }
      },
      11: {
        name: "Conventions signées",
        fields: {
          convType: "text",
          institutions: "text",
          coordinator: "text",
          funding: "number"
        }
      }
    },
    selectedType: -1,
    pubToAdd: {},
    isArray: ["authors", "references", "jury", "institutions"],
    finalPub: {}
  }

  onSelectClick = (e) => {
    console.log(e.target.value);
    this.setState({selectedType: e.target.value, pubToAdd: {}});
  }

  onChange = e => {
    let newPub = {...this.state.pubToAdd};
    if(this.state.isArray.indexOf(e.target.name) === -1){
      if(e.target.type === 'number'){

        if(e.target.name === 'begin' || e.target.name === 'end') {
          if(newPub.pages) newPub.pages[e.target.name] = parseInt(e.target.value);
          else {
            newPub.pages = {
              begin: 0,
              end: 0
            }
            newPub.pages[e.target.name] = parseInt(e.target.value);
          }
        } else newPub[e.target.name] = parseFloat(e.target.value);

      }else newPub[e.target.name] = e.target.value;
    }
    else newPub[e.target.name] = e.target.value.split(", ");
    this.setState({
      pubToAdd: newPub
    });
    console.log(this.state.pubToAdd);
  }

  onSubmit = e => {
    if(this.state.pubToAdd.IF) {
      let newPub = {...this.state.pubToAdd};
      newPub.IF = parseFloat(newPub.IF);
      newPub.type = this.state.selectedType;
      this.props.addPublication(e, newPub, this.props.history.push);
    } else this.props.addPublication(e, {...this.state.pubToAdd, type: this.state.selectedType}, this.props.history.push);
    console.log('[pubToAdd] ', this.state.pubToAdd);
  }

  render() {
    return (
      <div>
        <Search {...this.props} search={this.props.search} />
        <select className="type-select" onClick={this.onSelectClick} defaultValue="">
          <option value="" disabled>Select your option</option>
          {
            Object.keys(this.state.types).map((type, index) => 
              <option key={index} value={type} >
                {this.state.types[type].name}
              </option>
            )
          }
        </select>
        <form onSubmit={this.onSubmit}>
          {
            this.state.selectedType > 0 ?
              <div>
                Title: <input 
                    type="text" 
                    name="title" 
                    value={this.state.pubToAdd.title ? `${this.state.pubToAdd.title}` : ''}
                    onChange={this.onChange}/>
              </div>
              : null
          }

          {
            this.state.selectedType > 0 ?
              Object.keys(this.state.types[`${this.state.selectedType}`].fields).map( (field, index) =>
                <div key={index}>
                  {field}:
                  {
                    field !== 'pages' ?
                      <input 
                        type={this.state.types[`${this.state.selectedType}`].fields[field]}
                        name={field}
                        value={
                          this.state.pubToAdd[field] ? 
                          this.state.isArray.indexOf(field) === -1 ?
                            `${this.state.pubToAdd[field]}` 
                            : this.state.pubToAdd[field].join(", ")
                          : ''
                        }
                        onChange={this.onChange}  />
                    : <span> &nbsp;
                        Begin: <input
                                  type="number"
                                  name="begin"
                                  value={this.state.pubToAdd[field] ? this.state.pubToAdd[field].begin : 0}
                                  onChange={this.onChange} /> 
                        &nbsp;&nbsp;
                        End: <input
                                type="number"
                                name="end"
                                value={this.state.pubToAdd[field] ? this.state.pubToAdd[field].end : 0}
                                onChange={this.onChange} /> 
                      </span>
                  }
                </div>
              )
            : null
          }
          {this.state.selectedType > 0 ? <button>done</button> : null}
        </form>
      </div>
    );
  }
}

export default AddPub;