import React from 'react';
import axiosClient from '../../../axiosClient';

import './Index.css';

class GalleryIndex extends React.Component {
  state = {
    galleries: []
  }

  componentDidMount(){
    axiosClient.get('/galleries')
      .then(res => {
        console.log(res.data); // response depends on axios
        this.setState({ galleries: res.data });
      });    
  }

  renderGalleryList = () => {
    const galleries = this.state.galleries;
    return (
      galleries.map(gallery => {
        return <li key={ gallery.id }>
          <h3>{ gallery.title }</h3>
          <p>{ gallery.description }</p>
        </li>
      })
    )
  }

  render(){
    return(
      <div className="GalleryIndex">
        <h1>Gallery</h1>
        <ul>
          { this.renderGalleryList() }
        </ul>
      </div>  
    );
  }
}

export default GalleryIndex;