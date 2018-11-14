import React from 'react';
import Search from './Search';
import '../css/Home.css';


const home = (props) => {
  props.aggregate();

  return (
    <div>
      <Search {...props} search={props.search} />      
      <div className="results">
        <div className="side-bar-container">
          <div className="side-bar">
            <h3 className="side-bar__heading">Categories</h3>
            {
              Object.keys(props.types).map((field, index) => 
                props.typesCount[index + 1] ?
                <div 
                  key={index}
                  className="pubType"
                  onClick={ e => {
                    e.preventDefault();
                    props.history.push('/results');
                    
                    // !!props.query ? props.search({...props.query, type: index+1}) : props.search  ({type: index+1});
                    props.search({type: index+1});
                    !!props.query ? props.setQuery({...props.query, type: index+1}) : props.setQuery({type: index+1});
                  }
                  }>
                  {props.types[field].length > 55 ? `${props.types[field].slice(0, 55)}...` : props.types[field]}
                  <span className="pubType-count">
                    {props.typesCount[index + 1]}
                  </span>
                </div>  
                : null
              )
            }
          </div>
        </div>
        <div className="main-home">
          Try searching for something
        </div>
      </div>
    </div>
  );
}

export default home;