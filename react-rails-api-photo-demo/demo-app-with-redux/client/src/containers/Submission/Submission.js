import React from 'react';
import Input from '../../components/UI/input/input';
import { saveImage } from '../../utilities/api-helpers';

class Submission extends React.Component {
  state = {
    title: '',
    image: null
  }

  onFileUploadHandler = (e) => {
    const file = e.target.files[0];
    this.setState({
      ...this.state,
      image: file
    });
  };
  
  onSubmitHandler = (e) => {
    e.preventDefault();
    const title = this.state.title;
    const image = this.state.image;

    // create form data
    const formData = new FormData();
    formData.append('photo', image);
    formData.append('title', title);
    console.log(formData);
    // submit the data to images#create
    saveImage(formData)
    .then(res => console.log('Upload response', res))
    .catch(err => console.log('Upload error', err));
  };

  onChangeHandler = (e) => {
    const value = e.target.value;
    this.setState({
      title: value
    });
  };


  render(){
    return(
      <div className="container">
        <h1>Submission Page</h1>
        <p>Add a photo, and share it with our community.</p>
        <form onSubmit={ this.onSubmitHandler }>
          <Input 
            name="title"
            type="text"
            value={ this.state.title }
            changed={ this.onChangeHandler }
            label="Title"
            placeholder="Add a title"
          />
        
          <Input
            name="photo" 
            type="file"
            changed={ this.onFileUploadHandler }
            accept="image/*" />

          <Input type="submit" value="Submit" />
        </form>
      </div> 
    );
  }
}
export default Submission;