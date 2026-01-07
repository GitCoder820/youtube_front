import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/signup/signup.jsx';
import Login from './components/login/login.jsx';
import Upload from './components/upload/upload.jsx';
import Home from './components/home/home';
import Video from './components/video/Video.jsx';
import upload from './components/upload/upload.jsx';
import Searched from './components/searched content/search.jsx';
import { useState } from 'react';
import { list } from './components/navigation_bar/searchedlist.js';

const router= createBrowserRouter([
    {path:"/",
      element:<><App/></>
    },
    {path:"/home",
      element:<><App/></>
    },
    {path:"/signup",
      element:<><Signup/></>
    },
    {path:"/upload",
      element:<><Upload/></>
    },
    {path:"/login",
      element:<><Login/></>
    },
    {
      path:"/searchpage",
      element:<><Searched/></>
    },
    { path: "/video", element: <><Video key={Date.now()} /></>},
    // {path:"/video_page",element:<><Vnav/></>}
  ])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />,
)
