import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';

import Idea from './Idea';

export default class IdeasContainer extends React.Component {
  state = {
    ideas: []
  };

  componentDidMount(){
    axios.get('http://localhost:3001/api/v1/ideas.json')
      .then(res => {
        console.log(res);
        this.setState({
          ideas: res.data
        });
      })
      .catch(err => console.log(err));
  }

  // submit new idea to rails api
  addNewIdea = () => {
    axios.post('http://localhost:3001/api/v1/ideas', {
      idea: { title: '', body: ''}
      })
      .then(res => {
        console.log(res);
        // update the state immutably
        const updatedIdeas = update(this.state.ideas, {$splice: [[0, 0, res.data]]});
        this.setState({ ideas: updatedIdeas });
      })
      .catch(err => console.log(err));
  }

  render(){
    return(
      <div>
        <button 
          onClick={ this.addNewIdea }
          className="newIdeaButton">Add an Idea</button>
        <ul>
          { this.state.ideas.map(idea => {
            return <Idea key={idea.id} { ...idea }/>
          })}
        </ul>
      </div>
    );
  }
}
