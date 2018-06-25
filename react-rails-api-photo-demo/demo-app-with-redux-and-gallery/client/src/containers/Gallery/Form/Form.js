import React, { Component } from 'react';
import axiosClient from '../../../axiosClient';
import './Form.css';

class GalleryForm extends Component {
  state = {
    selectedGalleryImageFiles: [],
    submitFormProgress: 0,
    isSubmittingForm: false,
    didFormSubmissionComplete: false,
    gallery: {
      id: this.props.match.params.id,
      title: '',
      description: '',
      errors: {}
    }
  };

  componentWillMount() {
    if (this.props.match.params.id) {
      axiosClient.get(`/api/v1/galleries/${this.props.match.params.id}`).then(response => {
        console.log(response.data);
        this.setState({
          selectedGalleryImageFiles: response.data.image_files,
          gallery: {
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            errors: {}
          }
        });
      });
    }
  }

  getNumberOfSelectedFiles() {
    return this.state.selectedGalleryImageFiles.filter(el => {
      return el._destroy !== true;
    }).length;
  }

  render() {
    return (
      <div className="GalleryForm">
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              onChange={e => this.handleGalleryTitleChange(e)}
              value={this.state.gallery.title}
              className="form-control"
            />
            {this.renderGalleryTitleInlineError()}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              type="text"
              onChange={e => this.handleGalleryDescriptionChange(e)}
              value={this.state.gallery.description}
              className="form-control"
            />
            {this.renderGalleryDescriptionInlineError()}
          </div>
          <div className="form-group">
            <label>Covers</label>
            {this.renderUploadImagesButton()}
            {this.renderSelectedGalleryImageFiles()}
          </div>
          {this.renderUploadFormProgress()}
          <button
            disabled={this.state.isSubmittingForm}
            onClick={e => this.handleFormSubmit()}
            className="btn btn-primary">
            {this.state.isSubmittingForm ? 'Saving...' : 'Save'}
          </button>
          &nbsp;
          <button
            disabled={this.state.isSubmittingForm}
            onClick={e => this.handleCancel()}
            className="btn btn-default">
            Cancel
          </button>
        </form>
        <br />
      </div>
    );
  }

  renderUploadImagesButton() {
    let numberOfSelectedImages = this.getNumberOfSelectedFiles();
    return (
      <div>
        <input
          name="images[]"
          ref={field => (this.galleryImagesField = field)}
          type="file"
          disabled={this.state.isSubmittingForm}
          multiple={true}
          accept="image/*"
          style={{
            width: 0.1,
            height: 0.1,
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1
          }}
          id="gallery_images"
          onChange={e => this.handleGalleryImageChange(e)}
          className="form-control"
        />
        <label
          disabled={this.state.isSubmittingForm}
          className="btn btn-success"
          htmlFor="gallery_images">
          <span className="glyphicon glyphicon-cloud-upload" />
          &nbsp; &nbsp;
          {numberOfSelectedImages === 0
            ? 'Upload Files'
            : `${numberOfSelectedImages} file${numberOfSelectedImages !== 1
                ? 's'
                : ''} selected`}
        </label>
      </div>
    );
  }

  renderSelectedGalleryImageFiles() {
    let fileDOMs = this.state.selectedGalleryImageFiles.map((el, index) => {
      if (el._destroy) {
        return null;
      }

      return (
        <li key={index}>
          <div className="photo">
            <img
              width={150}
              src={el.id ? el.url : URL.createObjectURL(el)}
              style={{ alignSelf: 'center' }}
            />
            <div
              className="remove"
              onClick={() => this.removeSelectedGalleryImageFile(el, index)}>
              <span style={{ top: 2 }} className="glyphicon glyphicon-remove" />
            </div>
          </div>
          <div className="file-name">
            {el.name}
          </div>
        </li>
      );
    });

    return (
      <ul className="selected-covers">
        {fileDOMs}
      </ul>
    );
  }

  renderUploadFormProgress() {
    if (this.state.isSubmittingForm === false) {
      return null;
    }

    return (
      <div className="progress">
        <div
          className={
            'progress-bar progress-bar-info progress-bar-striped' +
            (this.state.submitFormProgress < 100 ? 'active' : '')
          }
          role="progressbar"
          aria-valuenow={this.state.submitFormProgress}
          areavaluemin="0"
          areavaluemax="100"
          style={{ width: this.state.submitFormProgress + '%' }}>
          {this.state.submitFormProgress}% Complete
        </div>
      </div>
    );
  }

  removeSelectedGalleryImageFile(image, index) {
    let { selectedGalleryImageFiles } = this.state;
    if (image.id) {
      selectedGalleryImageFiles[index]._destroy = true;
    } else {
      selectedGalleryImageFiles.splice(index, 1);
    }

    this.setState({
      selectedGalleryImageFiles: selectedGalleryImageFiles
    });
  }

  handleGalleryImageChange() {
    let selectedFiles = this.galleryImagesField.files;
    let { selectedGalleryImageFiles } = this.state;
    for (let i = 0; i < selectedFiles.length; i++) {
      selectedGalleryImageFiles.push(selectedFiles.item(i));
    } //end for

    this.setState(
      {
        selectedGalleryImageFiles: selectedGalleryImageFiles
      },
      () => {
        this.galleryImagesField.value = null;
      }
    );
  }

  handleGalleryTitleChange(e) {
    let { gallery } = this.state;
    gallery.title = e.target.value;
    this.setState({ gallery: gallery });
  }

  handleGalleryDescriptionChange(e) {
    let { gallery } = this.state;
    gallery.description = e.target.value;
    this.setState({ gallery: gallery });
  }

  renderGalleryTitleInlineError() {
    if (this.state.gallery.errors.title) {
      return (
        <div className="inline-error alert alert-danger">
          {this.state.gallery.errors.title.join(', ')}
        </div>
      );
    } else {
      return null;
    }
  }

  renderGalleryDescriptionInlineError() {
    if (this.state.gallery.errors.description) {
      return (
        <div className="inline-error alert alert-danger">
          {this.state.gallery.errors.description.join(', ')}
        </div>
      );
    } else {
      return null;
    }
  }

  handleCancel() {
    this.props.history.push('/galleries');
  }

  buildFormData() {
    let formData = new FormData();
    formData.append('gallery[title]', this.state.gallery.title);
    formData.append('gallery[description]', this.state.gallery.description);

    let { selectedGalleryImageFiles } = this.state;
    for (let i = 0; i < selectedGalleryImageFiles.length; i++) {
      let file = selectedGalleryImageFiles[i];
      if (file.id) {
        if (file._destroy) {
          formData.append(`gallery[images_attributes][${i}][id]`, file.id);
          formData.append(`gallery[images_attributes][${i}][_destroy]`, '1');
        }
      } else {
        formData.append(
          `gallery[images_attributes][${i}][file]`,
          file,
          file.name
        );
      }
    }
    return formData;
  }

  submitForm() {
    let submitMethod = this.state.gallery.id ? 'patch' : 'post';
    let url = this.state.gallery.id
      ? `/galleries/${this.state.gallery.id}.json`
      : '/galleries.json';

    axiosClient
      [submitMethod](url, this.buildFormData(), {
        onUploadProgress: progressEvent => {
          let percentage = progressEvent.loaded * 100.0 / progressEvent.total;
          this.setState({
            submitFormProgress: percentage
          });
        }
      })
      .then(response => {
        console.log('RESPONSE: ', response);
        this.setState({
          didFormSubmissionComplete: true
        });
        this.props.history.push('/gallery');
      })
      .catch(error => {
        console.log('Submit Error', error);
        let { gallery } = this.state;
        gallery.errors = error.response.data; // depends upon axios
        this.setState({
          isSubmittingForm: false,
          submitFormProgress: 0,
          gallery: gallery
        });
      });
  }

  handleFormSubmit() {
    let { gallery } = this.state;
    gallery.errors = {};
    this.setState({
      isSubmittingForm: true,
      gallery: gallery
    },
      () => {
        this.submitForm();
      }
    );
  }
}

export default GalleryForm;