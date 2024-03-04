import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Shop } from './layers/Shop'
import { HomePage } from './page/HomePage'

export default createBrowserRouter([
  {
    path: '/',
    element: <Shop />,
    children: [
      {
        path: '/',
        element: <HomePage />
      }
    ]
  }
])
