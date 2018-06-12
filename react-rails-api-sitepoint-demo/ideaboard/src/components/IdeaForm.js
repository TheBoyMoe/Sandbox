import React from 'react';
import axios from 'axios';

export default class IdeaForm extends React.Component {
  state = {
		title: this.props.title,
		body: this.props.body
  }

  handleInput = (e) => {
    this.props.resetNotification();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleBlur = () => {
    const idea = {
      title: this.state.title,
      body: this.state.body
    };

    axios.put(`http://localhost:3001/api/v1/ideas/${this.props.id}`, { idea: idea })
      .then(res => {
        console.log(res);
        this.props.updateIdea(res.data);
      })
      .catch(err => console.log(err));
  };

  render(){
    return (
      <div className="tile">
        <form onBlur={ this.handleBlur }>
          <input 
						value={ this.state.title }
						onChange={ this.handleInput }
            ref={ this.props.titleRef }
						className="input" 
						type="text" 
						name="title" 
						placeholder="add a title" />

          <textarea 
						value={ this.state.body }
            onChange={ this.handleInput }
						className="input" 
						name="body" 
						placeholder="Describe your idea"></textarea>
        </form>
      </div>
    );
  }
}

