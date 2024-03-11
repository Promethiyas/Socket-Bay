import * as React from 'react'
import ReactDom from 'react-dom/client'
import { UserProvider } from './components/UserProvider.tsx'
import {
  RouterProvider
} from 'react-router-dom'
import router from './router.tsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const host = document.querySelector('#root')
if (host === null) console.log('Missing react mounting point: #root')
else {
  const root = ReactDom.createRoot(host)
  root.render(<App />)
}

const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(17, 70, 56%)'
    },
    secondary: {
      main: 'hsl(0, 0, 92%)'
    },
    background: {
      default: 'hsl(0, 0%, 92%)'
    },
    text: {
      secondary: '#FFFFFF'
    }
  }
})

function App (): JSX.Element {
  return (
    <React.StrictMode>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </UserProvider>
    </React.StrictMode>
  )
}
