import React from 'react';
import Search from './Search';
import '../css/Home.css';

class Home extends React.Component {
  componentDidMount() {
    this.props.aggregate();
  }

  render() {
    return (
      <div>
        <Search {...this.props} search={this.props.search} />
        <div className="results">
          <div className="side-bar-container">
            <div className="side-bar">
              <h3 className="side-bar__heading">Categories</h3>
              {Object.keys(this.props.types).map(
                (field, index) =>
                  this.props.typesCount[index + 1] ? (
                    <div
                      key={index}
                      className="pubType"
                      onClick={e => {
                        e.preventDefault();
                        this.props.history.push('/results');

                        // !!this.props.query ? this.props.search({...this.props.query, type: index+1}) : this.props.search  ({type: index+1});
                        this.props.search({ type: index + 1 });
                        !!this.props.query
                          ? this.props.setQuery({
                              ...this.props.query,
                              type: index + 1
                            })
                          : this.props.setQuery({ type: index + 1 });
                      }}>
                      {this.props.types[field].length > 55
                        ? `${this.props.types[field].slice(0, 55)}...`
                        : this.props.types[field]}
                      <span className="pubType-count">
                        {this.props.typesCount[index + 1]}
                      </span>
                    </div>
                  ) : null
              )}
            </div>
          </div>
          <div className="main-home">Try searching for something</div>
        </div>
      </div>
    ); // End of return
  } // End of render
} // End of class

export default Home;
