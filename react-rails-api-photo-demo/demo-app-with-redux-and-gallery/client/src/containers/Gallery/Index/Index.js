import React from 'react';
import axiosClient from '../../../axiosClient';

import './Index.css';

class GalleryIndex extends React.Component {
  state = {
    isMounted: false,
    galleries: []
  }

  componentDidMount(){
    this.setState({
      isMounted: true
    }, this.fetchGalleries())
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }
  
  fetchGalleries = () => {
    axiosClient.get('/galleries')
      .then(res => {
        if(this.state.isMounted)
          this.setState({ galleries: res.data });
      })
      .catch(err => console.log('Error fetching galleries', err));
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

  flattenGallery = () => {
    const galleries = this.state.galleries;
    const images = [];
    galleries.forEach((gallery) => {
      const id = gallery.id;
      gallery.image_files.forEach((image) => {
        images.push({ galleryId: id, image: image });
      })
    });
    return images;
  }

  randomizeGallery = () => {
    const images = this.flattenGallery();
    const temp = [];
    while(images.length !== 0){
      const i = Math.floor(Math.random() * images.length);
      temp.push(images[i]);
      images.splice(i, 1);
    }
    return temp;
  }

  renderImageGallery = () => {
    const images = this.randomizeGallery();
    return images.map(obj => {

      return (<li className="image" key={ obj.image.id }>
          <a href={`/gallery/${obj.galleryId}`}>
            <img src={ obj.image.url } alt={ obj.image.name }/>
          </a>
        </li>
      );
    });
  }

  render(){
    return(
      <div className="GalleryIndex">
        <h1>Gallery</h1>
        <ul className="gallery">
          { this.renderImageGallery() }
        </ul>
      </div>  
    );
  }
}

export default GalleryIndex;