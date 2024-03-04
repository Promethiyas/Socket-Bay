import * as React from 'react'
import ReactDom from 'react-dom/client'
import { UserProvider } from './components/UserProvider.tsx'
import { HomePage } from './page/HomePage.tsx'

const host = document.querySelector('#root')
if (!host) console.log('Missing react mounting point: #root')
else {
  const root = ReactDom.createRoot(host)
  root.render(<App />)
}

function App() {
  return <React.StrictMode>
    <UserProvider>
      <HomePage />
    </UserProvider>
  </React.StrictMode>
}