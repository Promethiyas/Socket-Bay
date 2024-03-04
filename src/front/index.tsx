import * as React from 'react'
import ReactDom from 'react-dom/client'

const host = document.querySelector('#root')
if (!host) console.log('Missing react mounting point: #root')
else {
  const root = ReactDom.createRoot(host)
  root.render(<App />)
}

function App() {
  return <React.StrictMode>
    <>Hello</>
  </React.StrictMode>
}