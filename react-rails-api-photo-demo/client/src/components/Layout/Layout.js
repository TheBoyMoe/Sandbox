import React from 'react';
import Toolbar from '../Toolbar/Toolbar';

import './Layout.css';

const layout = (props) => {
  return (
    <div>
      <Toolbar />
      <main className="Content">
        { props.children }
      </main>
    </div>
  );
};

export default layout;