import React from 'react'
import ThemeProvider from './theme'
import Router from './routes/router'
import 'react-toastify/dist/ReactToastify.css'
import Toast from './features/toast/components/Toast'

function App() {

  return (
    <ThemeProvider theme='dark' >
      <Router />
      <Toast />
    </ThemeProvider>
  )
}

export default App