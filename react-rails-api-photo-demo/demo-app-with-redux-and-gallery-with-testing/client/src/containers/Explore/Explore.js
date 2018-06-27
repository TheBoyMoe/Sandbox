import React from 'react';
import axios from 'axios';

import Image from './Image/image';
import './Explore.css';

export default class Explore extends React.Component {
  state = {
    images: []
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/images.json')
      .then(res => {
        // console.log(res);
        this.setState({
          images: res.data
        });
      })
      .catch(err => console.log(err.message));
  }

  render() {
    const images = this.state.images.map(image => {
      return <Image key={ image.id } { ...image } />
    })
    return (
      <div>
        <h1>Explore our collection</h1>
        <ul className="Gallery">
          {images}
        </ul>
      </div>
    );
  }
}