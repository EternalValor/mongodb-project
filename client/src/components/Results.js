import React from 'react';
import Publication from './Publication';
import Search from './Search';
import '../css/Results.css';

class Results extends React.Component {

  state = {
    expanded: -1,
    beingUpdated: -1,
    updatedPub: {}
  }

  expandPub = (key) => {
    this.setState({expanded: key});
  }

  beingUpdated = (key, pub) => {
    this.setState({
      beingUpdated: key,
      updatedPub: pub
    });
  }

  onChange = (e) => {
    let updatedPub = { ...this.state.updatedPub };
    if(e.target.type === "number") {
      if(e.target.name === 'begin' || e.target.name === 'end') {
        updatedPub.pages[e.target.name] = parseInt(e.target.value);
      }  else updatedPub[e.target.name] = parseInt(e.target.value);

    } else if(typeof updatedPub[e.target.name] == typeof []) {
      let newArr = e.target.value.split(", ");
      updatedPub[e.target.name] = newArr;

    } else if(e.target.name === 'IF') {
      if(e.target.value === '' || e.target.value === '0.0') {
        updatedPub.IF = 0.0;
        e.target.value = '0.01';
      } else updatedPub.IF = parseFloat(e.target.value);

    } else updatedPub[e.target.name] = e.target.value;
    this.setState({updatedPub});
    console.log(updatedPub);
  }

  render() {
    return (
      <div>
        <Search {...this.props} search={this.props.search} />      
        <div className="results">
        <div className="side-bar-container">
          <div className="side-bar">
            <h3 className="side-bar__heading">Categories</h3>
            {
              Object.keys(this.props.types).map((field, index) => 
                this.props.typesCount[index + 1] ?
                <div 
                  key={index}
                  className="pubType"
                  onClick={ e =>
                    this.props.query !== [] ? this.props.search(e, {...this.props.query, type: index+1}, this.props.history.push) : this.props.search(e, {type: index+1}, this.props.history.push)
                  }>
                  {this.props.types[field].length > 55 ? `${this.props.types[field].slice(0, 55)}...` : this.props.types[field]}
                  <span className="pubType-count">
                    {this.props.typesCount[index + 1]}
                  </span>
                </div>  
                : null
              )
            }
          </div>
        </div>
          <div className="publications" >
                {
                  this.props.publications.length ?
                    this.props.publications.map((publication, index) => 
                      <Publication 
                        key={index}
                        publication={publication}
                        index={index}
                        expanded={index === this.state.expanded ? true : false}
                        onClick={this.expandPub}
                        delete={this.props.delete} 
                        update={this.beingUpdated}
                        beingUpdated={this.state.beingUpdated}
                        inputChange={this.onChange} 
                        updatedPub={this.state.updatedPub}
                        updateHandler={this.props.updateHandler}
                        types={this.props.types} />
                        )
                  : <div className="no-results">Oops we couldn't retrieve any results, please try again.</div>
                }
          </div>
        </div>
      </div>
    );
  }

}

export default Results;