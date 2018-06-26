import React from 'react';
import axiosClient from '../../../axiosClient';

class ShowGallery extends React.Component {
  state = {
    gallery: {
      id: '', 
      title: '',
      description: '',
      image_files: [],
      errors: {}
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if(id) {
      axiosClient.get(`/galleries/${id}`)
        .then(res => {
          this.setState({
            gallery: {
              id: res.data.id,
              title: res.data.title,
              description: res.data.description,
              image_files: res.data.image_files,
              errors: {}
            }
          }, () => console.log(this.state))
        })
        .catch(err => {
          console.log(err.response.status, err.response.statusText);
          const gallery = {
            ...this.state.gallery,
            errors: { 
              status: err.response.status, 
              message: err.response.statusText 
            }
          }
          this.setState({
            gallery: gallery,
            }, () => { console.log('Error fetching gallery', this.state) }
          );
        });
    }
  }

  renderGallery = () => {
    const images = this.state.gallery.image_files;
    if(images.length > 0){
      return images.map(image => {
        return <li className="image" key={ image.id }><img src={ image.url } alt={ image.name } /></li>
      })
    }
  }

  render(){
    return(
      <div>
        <h1>{ this.state.gallery.title }</h1>
        <p>{ this.state.gallery.description }</p>
        <ul className="gallery">
          { this.renderGallery() }
        </ul>
      </div>
    );
  }
}

export default ShowGallery;