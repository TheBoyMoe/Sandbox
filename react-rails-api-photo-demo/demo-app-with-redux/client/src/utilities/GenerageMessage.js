import React from 'react';

export default class GenerateMessage extends React.Component {
  state = {
    show: true
  }

  onClickHandler(e) {
    console.log('Clicked');
    this.setState({ show: false });
  }

  render(){
    return (
      <div className={ this.props.styles.join(' ')} role="alert">
        <button onClick={ this.onClickHandler } type="button" className="close" data-dismiss="alert">
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{ this.props.message }</strong>
      </div>
    );
  }
};