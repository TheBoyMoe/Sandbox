import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';

import Idea from './Idea';
import IdeaForm from './IdeaForm';

export default class IdeasContainer extends React.Component {
  state = {
    ideas: [],
    editingIdeaId: null
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
        this.setState({ 
          ideas: updatedIdeas,
          editingIdeaId: res.data.id
        });
      })
      .catch(err => console.log(err));
  }

  updateIdea = (idea) => {
    const ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id);
    const ideas = update(this.state.ideas, {
      [ideaIndex]: { $set: idea }
    });
    this.setState({ ideas: ideas });
  };

  render(){
    return(
      <div>
        <button 
          onClick={ this.addNewIdea }
          className="newIdeaButton">Add an Idea</button>
        <div>
          { this.state.ideas.map(idea => {
            if(this.state.editingIdeaId === idea.id){
              return <IdeaForm 
                       updateIdea={ this.updateIdea }
                       key={ idea.id } 
                       { ...idea }/>
            } else {
              return <Idea key={ idea.id } { ...idea }/>
            }
          })}
        </div	>
      </div>
    );
  }
}
