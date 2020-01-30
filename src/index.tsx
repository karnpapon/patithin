import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import './index.css';

import('../pkg/rust_binding_lib').then(rust_module => {
    // console.log("mod",  rust_module.adding(1,4))
    console.log("mod",  rust_module)
})


ReactDOM.render(<App />, document.getElementById('root'));
