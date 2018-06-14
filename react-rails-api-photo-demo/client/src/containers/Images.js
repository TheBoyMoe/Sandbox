import React from 'react';
import axios from 'axios';

import Image from '../components/image';

export default class Images extends React.Component {
  state = {
    images: []
  }

  componentDidMount(){
    axios.get('http://localhost:3000/api/v1/images.json')
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err.message));    
  }

  render(){
    // TODO 
    return (
      <div>Images</div>  
    );
  }
}