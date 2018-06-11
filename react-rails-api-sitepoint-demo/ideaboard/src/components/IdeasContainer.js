import React from 'react';
import axios from 'axios';

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

  render(){
    return(
      <div>
        <ul>
          { this.state.ideas.map(idea => {
            return <Idea key={idea.id} { ...idea }/>
          })}
        </ul>
      </div>
    );
  }
}
