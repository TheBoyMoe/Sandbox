import React from 'react';
import GalleryForm from '../Form/Form';
import './New.css';

const galleryNew = (props) => {
  return (
    <div className="GalleryNew col-md-8 col-md-offset-2">
      <h2>Add a new gallery</h2>
      <GalleryForm 
        match={ props.match }
        history={ props.history }/>
    </div>
  );
};
export default galleryNew;