import React from 'react';

export default class Idea extends React.Component {
  handleClick = () => {
    this.props.clicked(this.props.id);
  };

  render(){
    return (
      <div className="tile">
        <h3 onClick={ this.handleClick }>{ this.props.title }</h3>
        <p onClick={ this.handleClick }>{ this.props.body }</p>
      </div>
    );
  }
}

