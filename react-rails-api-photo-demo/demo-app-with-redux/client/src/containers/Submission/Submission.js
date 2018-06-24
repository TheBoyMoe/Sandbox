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
    const reader = new FileReader();
    reader.onloadend = () => { 
      // console.log('Result: ', reader.result) 
      this.setState({
        ...this.state,
        image: reader.result
      });
    }
    reader.readAsDataURL(file);

  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    // const title = this.state.title;
    // const image = this.state.image;

    // create form data
    // const formData = new FormData();
    // formData.append('file', image);
    // formData.append('path', '/path/to/file')
    // formData.append('title', title);

    // submit the data to images#create
    saveImage({
      'image': {
        'title': this.state.title,
        'file': this.state.image,
        'path': '/path/to file'
      }
    })
      .then(res => console.log('Upload response', res))
      .catch(err => console.log('Upload error', err));
  };

  onChangeHandler = (e) => {
    const value = e.target.value;
    this.setState({
      title: value
    });
  };


  render() {
    return (
      <div className="container">
        <h1>Submission Page</h1>
        <p>Add a photo, and share it with our community.</p>
        <form onSubmit={this.onSubmitHandler}>
          <Input
            name="title"
            type="text"
            value={this.state.title}
            changed={this.onChangeHandler}
            label="Title"
            placeholder="Add a title"
          />

          <Input
            name="file"
            type="file"
            changed={this.onFileUploadHandler}
            accept="image/*" />

          <Input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default Submission;