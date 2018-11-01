import React from 'react';
import Publication from './Publication';
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

  update

  render() {
    return (
      <div className="publications" >
            {
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
                  updateHandler={this.props.updateHandler} />
              )
            }
      </div>
    );
  }

}

export default Results;