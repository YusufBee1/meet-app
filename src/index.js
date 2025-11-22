import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import * as atatus from 'atatus-spa';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

atatus.config('eb1d31712f644482b95bf377641fb875').install();
atatus.notify(new Error('Test Atatus Setup')); // Optional: verify it's working

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Register the service worker
serviceWorkerRegistration.register();
