import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MRoute from './routes/index';
import 'antd/dist/antd.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <MRoute />,
    document.getElementById('root')
);

registerServiceWorker();