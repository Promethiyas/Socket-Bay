import * as React from 'react'
import ReactDom from 'react-dom/client'
import { UserProvider } from './components/UserProvider.tsx'
import {
  RouterProvider
} from 'react-router-dom'
import router from './router.tsx'

const host = document.querySelector('#root')
if (host === null) console.log('Missing react mounting point: #root')
else {
  const root = ReactDom.createRoot(host)
  root.render(<App />)
}

function App (): JSX.Element {
  return (
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </React.StrictMode>
  )
}
