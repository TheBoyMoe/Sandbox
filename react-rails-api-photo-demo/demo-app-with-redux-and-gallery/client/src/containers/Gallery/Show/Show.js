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
          console.log(res);
          this.setState({
            gallery: {
              id: res.data.id,
              title: res.data.title,
              description: res.data.description,
              image_files: res.data.image_files,
              errors: {}
            }
          })
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

  }

  render(){
    return(
      <div>
        <h1>{ this.state.gallery.title }</h1>
        <p>{ this.state.gallery.description }</p>
        <ul>
          { this.renderGallery() }
        </ul>
      </div>
    );
  }
}

export default ShowGallery;