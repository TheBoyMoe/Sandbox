import React from 'react';

export default class Idea extends React.Component {
  handleClick = () => {
    this.props.clicked(this.props.id);
  };

  handleDelete = () => {
    this.props.deleted(this.props.id);
  };

  render(){
    return (
      <div className="tile">
        <span 
          onClick={ this.handleDelete }
          className="deleteButton">x</span>
        <h3 onClick={ this.handleClick }>{ this.props.title }</h3>
        <p onClick={ this.handleClick }>{ this.props.body }</p>
      </div>
    );
  }
}

