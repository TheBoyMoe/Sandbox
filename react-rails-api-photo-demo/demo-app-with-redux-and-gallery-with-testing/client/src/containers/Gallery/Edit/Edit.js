import React from 'react';
import GalleryForm from '../Form/Form';

const galleryEdit = (props) => {
  return (
    <div className="GalleryEdit col-md-8 col-md-offset-2">
      <h2>Edit gallery</h2>
      <GalleryForm 
        match={ props.match }
        history={ props.history }/>
    </div>
  );
};
export default galleryEdit;