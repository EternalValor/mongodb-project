import React from 'react';
import '../css/Publication.css';

const publication = (props) => {

  let pubClass = '';
  let arrowClass = '';

  props.expanded ? pubClass = 'publication publication--expanded' : pubClass = 'publication';
  props.expanded ? arrowClass = 'arrow arrow--up' : arrowClass = 'arrow';


  let exclude = ['title', 'type', '_id'];

  return (
    <div className={pubClass} >
      <div className="publication__buttons">
        <svg 
          className="delete"
          style={{"width":'24px', "height": '24px'}} 
          viewBox="0 0 24 24"
          onClick={() => {
            props.delete(props.publication._id);
            props.showPopup(`${props.publication.title.slice(0, 15)}... successfully deleted!`, true)
          }}>
          <path 
            fill="#f96d6d" 
            d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
        </svg>
          &nbsp;&nbsp;
        <svg 
          className="update"
          style={{"width":'24px',"height":'24px'}} 
          viewBox="0 0 24 24"
          onClick={() => {
            props.beingUpdated === props.index ? props.update(-1, {}) : props.update(props.index, props.publication);
            if(!props.expanded) props.onClick(props.index);
          }}>
          <path 
            fill="#000000" 
            d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
        </svg>
      </div>
      <h1 className="publication__heading">
        {
          props.expanded ? 
            props.publication.title :
            (props.publication.title.length > 50) ? `${props.publication.title.slice(0, 50)}...` : props.publication.title
        }
      </h1>
      <div 
        className={arrowClass} 
        onClick={() => {
          props.expanded ? props.onClick(-1) : props.onClick(props.index);
          if(props.beingUpdated === props.index) props.update(-1, {});
        }}>&nbsp;</div>
      <div className="publication__body" >
        {
          props.expanded ? 
            props.beingUpdated !== props.index ?
              <div className="mt-2">
                <div className="publication__body__field" ><span className="field-title">type</span>: {props.types[`${props.publication.type}`]}</div>
                {
                  Object.keys(props.publication).map((field, index) =>
                    field !== '__v' ?
                      exclude.indexOf(field) === -1 ?
                        props.publication[field].length !== 0 ?
                          <div 
                            key={field}
                            className="publication__body__field" >
                            <span className="field-title">{field}</span>:&nbsp;
                            { field !== 'pages' ? 
                                  typeof props.publication[field] === "object" ?  
                                      props.publication[field].join(", ") : props.publication[field]
                              : `${props.publication[field].begin} - ${props.publication[field].end}`
                            }
                          </div>
                        : null
                      : null
                    : null
                  )
                }
              </div>  
            :
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if(props.updatedPub.IF) props.updatedPub.IF = document.querySelector("input[name='IF']").value;
                    props.updateHandler(e, props.publication._id, props.updatedPub);
                    if(props.beingUpdated === props.index) props.update(-1, {});
                    props.showPopup(`${props.updatedPub.title.slice(0, 25)}... successfully edited!`, false);
                  }}>
                  <div className="publication__body__field" >
                    <span className="field-title">Type</span>:&nbsp;
                    {props.types[`${props.publication.type}`]}
                  </div>
                  {
                    Object.keys(props.publication).map((field, index) =>
                      field !== '__v' ?
                        exclude.indexOf(field) === -1 ?
                          props.publication[field].length !== 0 ?
                            <div 
                              key={index}
                              className="publication__body__field" >
                              <span className="field-title">{field}</span>:&nbsp;
                              { field !== 'pages' ? 
                                    typeof props.publication[field] === "object" ?  
                                      <span className="input-text-array">
                                        <input
                                          type="text"
                                          name={field}
                                          value={props.updatedPub[field].join(", ")}
                                          onChange={props.inputChange} 
                                          className="input-text" />
                                          <br/>
                                      </span>
                                        : 
                                        field !== 'IF' ?
                                          <input
                                            type={typeof props.publication[field]}
                                            name={field}
                                            value={props.updatedPub[field]}
                                            onChange={props.inputChange}
                                            className="input-text" />
                                          :
                                          <input
                                            type="text"
                                            name={field}
                                            defaultValue={props.updatedPub[field]}
                                            className="input-text" />
                                : <span> &nbsp;
                                    Begin: <input
                                              type="number"
                                              name="begin"
                                              value={props.updatedPub[field].begin}
                                              onChange={props.inputChange} /> 
                                    &nbsp;&nbsp;
                                    End: <input
                                            type="number"
                                            name="end"
                                            value={props.updatedPub[field].end}
                                            onChange={props.inputChange} /> 
                                  </span>
                              }
                            </div>
                          : null
                        : null
                      : null
                    )
                  }
                  <button className="done-btn">Done</button>
                </form>
            : <div>Type: {props.types[`${props.publication.type}`]}</div>
        }
      </div>
    </div>
  );

}

export default publication;