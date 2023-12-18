import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBoxOpen, faCameraRetro, faCertificate, faCircleChevronLeft, faCircleChevronRight, faClipboardCheck, faHashtag, faImage, faPen, faTags, faTimes, faTornado, faTrash } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(faTornado, faImage, faBoxOpen, faCertificate, faHashtag, faTrash, faTimes, faPen, faClipboardCheck, faCameraRetro, faCircleChevronLeft, faCircleChevronRight, fab);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
