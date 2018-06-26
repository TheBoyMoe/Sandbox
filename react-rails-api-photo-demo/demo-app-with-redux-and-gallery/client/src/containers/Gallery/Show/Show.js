import React from 'react';
import { Redirect } from 'react-router-dom'

import axiosClient from '../../../axiosClient';
import './Show.css';

class ShowGallery extends React.Component {
  state = {
    gallery: {
      id: '', 
      title: '',
      description: '',
      image_files: [],
      redirect: false,
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
              redirect: false,
              errors: {}
            }
          }, () => console.log(this.state))
        })
        .catch(err => {
          console.log(err.response.status, err.response.statusText);
          const gallery = {
            ...this.state.gallery,
            redirect: true,
            errors: { 
              status: err.response.status, 
              message: err.response.statusText 
            }
          }
          this.setState({
            gallery: gallery,
            }, () => console.log('Error fetching gallery', this.state)
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

  handleEdit = (id) => {
    this.props.history.push(`/gallery/${id}/edit`);
  }

  // TODO display message when gallery deleted and user redirected
  handleRemove = (id) => {
    axiosClient.delete(`/galleries/${id}`);
    const gallery = {
      ...this.state.gallery,
      redirect: true
    }
    this.setState({
      gallery: gallery
    }, () => console.log('STATE', this.state));
  }

  // TODO display messsage when gallery not found
  render(){
    let redirect = null;
    if(this.state.gallery.redirect)
      redirect = <Redirect to="/gallery" />;

    return(
      <div className="GalleryShow">
        { redirect }
        <h1>{ this.state.gallery.title }</h1>
        <p>{ this.state.gallery.description }</p>
        <div className="buttons">
          <button
            onClick={() => this.handleEdit(this.state.gallery.id)}
            className="btn btn-primary">
            Edit
          </button>
          &nbsp;
          <button
            onClick={() => this.handleRemove(this.state.gallery.id)}
            className="btn btn-danger">
            Delete
          </button>
        </div>
        <ul className="gallery">
          { this.renderGallery() }
        </ul>
      </div>
    );
  }
}

export default ShowGallery;